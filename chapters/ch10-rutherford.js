// === Chapter 10: Rutherford Scattering ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch10',
        number: 10,
        title: 'Rutherford Scattering',
        subtitle: 'Alpha particles, gold foil, and the discovery that atoms have a tiny, massive heart',
        file: 'ch10-rutherford',

        sections: [
            // ============================================================
            // Section 0: The Gold Foil Experiment
            // ============================================================
            {
                id: 'gold-foil',
                title: 'The Gold Foil Experiment',
                content: `
<h2>Testing the Plum Pudding</h2>

<p>By 1909, Rutherford's lab in Manchester had a powerful tool: alpha particles (\\(\\alpha\\)) emitted by radioactive sources. These are helium nuclei (2 protons + 2 neutrons), carrying charge \\(+2e\\) and mass about 7,300 times the electron mass. They move at roughly 5% the speed of light, making them excellent atomic probes.</p>

<div class="env-block definition">
<div class="env-title">Definition: Alpha Particle</div>
<div class="env-body">
<p>An <strong>alpha particle</strong> (\\(\\alpha\\)) is a \\({}^4\\text{He}\\) nucleus: 2 protons and 2 neutrons bound together, with charge \\(+2e\\) and mass \\(m_\\alpha = 6.64 \\times 10^{-27}\\) kg. Typical kinetic energies from radioactive sources are 5-9 MeV.</p>
</div>
</div>

<p>Rutherford directed Geiger and Marsden to aim a narrow beam of alpha particles at a thin gold foil (about 400 atoms thick) and detect where the alphas went using a zinc sulfide screen that produced a tiny flash of light for each impact. They sat in the dark and counted flashes at various angles, hour after hour.</p>

<div class="env-block remark">
<div class="env-title">Why gold?</div>
<div class="env-body">
<p>Gold has a high atomic number (\\(Z = 79\\)), so the Coulomb force on the alpha particle is strong. Gold is also extremely malleable: it can be hammered into foils only a few hundred atoms thick, thin enough for most alphas to pass through without hitting multiple nuclei.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-rutherford-showpiece"></div>
`,
                visualizations: [
                    {
                        id: 'viz-rutherford-showpiece',
                        title: 'Rutherford Scattering Simulation',
                        description: 'Alpha particles stream toward a gold nucleus. Most pass through with slight deflection; rare ones bounce back. Drag the <strong>beam position</strong> slider to change the impact parameter and see how the scattering angle changes. The histogram (right) accumulates scattering angles over time. Hyperbolic trajectories follow the exact Coulomb force.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Gold nucleus position
                            var nucX = w * 0.42, nucY = h * 0.48;
                            var nucR = 8; // display radius

                            // Beam parameters
                            var beamOffset = 0; // impact parameter in pixels from nucleus center
                            var beamSpeed = 220; // pixels/sec

                            VizEngine.createSlider(controls, 'Beam offset (b)', -100, 100, 0, 1, function (v) {
                                beamOffset = v;
                            });

                            var autoFire = true;
                            VizEngine.createButton(controls, 'Toggle auto-fire', function () {
                                autoFire = !autoFire;
                            });

                            // Scattering histogram
                            var histBins = 18; // 0-180 degrees, 10 deg each
                            var histogram = new Array(histBins).fill(0);
                            var totalScattered = 0;

                            VizEngine.createButton(controls, 'Reset histogram', function () {
                                histogram = new Array(histBins).fill(0);
                                totalScattered = 0;
                            });

                            // Alpha particles
                            var alphas = [];
                            var maxAlphas = 40;

                            // Physical constants (scaled for display)
                            // Coulomb repulsion: F = k * q1 * q2 / r^2
                            // We use display-space units; scale the force constant for good visual
                            var kCoulomb = 800000; // tuned for visual

                            function spawnAlpha() {
                                // Random offset around the beam position
                                var spread = autoFire ? (Math.random() - 0.5) * 200 : 0;
                                var yStart = nucY + beamOffset + spread;
                                alphas.push({
                                    x: 20,
                                    y: yStart,
                                    vx: beamSpeed,
                                    vy: 0,
                                    trail: [],
                                    active: true,
                                    counted: false
                                });
                                if (alphas.length > maxAlphas) {
                                    alphas.shift();
                                }
                            }

                            var lastSpawn = 0;
                            var spawnInterval = 0.15; // seconds
                            var lastTime = performance.now();

                            function draw(now) {
                                var dt = Math.min((now - lastTime) / 1000, 0.03);
                                lastTime = now;

                                // Auto-spawn
                                lastSpawn += dt;
                                if (autoFire && lastSpawn > spawnInterval) {
                                    spawnAlpha();
                                    lastSpawn = 0;
                                }

                                // Physics update
                                for (var i = 0; i < alphas.length; i++) {
                                    var a = alphas[i];
                                    if (!a.active) continue;

                                    // Coulomb force from nucleus
                                    var dx = a.x - nucX;
                                    var dy = a.y - nucY;
                                    var r2 = dx * dx + dy * dy;
                                    var r = Math.sqrt(r2);

                                    if (r < 3) r = 3; // prevent blowup
                                    r2 = r * r;

                                    var F = kCoulomb / r2;
                                    var fx = F * dx / r;
                                    var fy = F * dy / r;

                                    a.vx += fx * dt;
                                    a.vy += fy * dt;
                                    a.x += a.vx * dt;
                                    a.y += a.vy * dt;

                                    // Record trail
                                    a.trail.push([a.x, a.y]);
                                    if (a.trail.length > 120) a.trail.shift();

                                    // Check if left the canvas
                                    if (a.x < -20 || a.x > w + 20 || a.y < -40 || a.y > h + 40) {
                                        a.active = false;
                                        // Record scattering angle
                                        if (!a.counted) {
                                            var angle = Math.atan2(a.vy, a.vx);
                                            // Scattering angle relative to initial direction (positive x)
                                            var scatter = Math.abs(angle) * 180 / Math.PI;
                                            var bin = Math.floor(scatter / (180 / histBins));
                                            if (bin >= histBins) bin = histBins - 1;
                                            if (bin < 0) bin = 0;
                                            histogram[bin]++;
                                            totalScattered++;
                                            a.counted = true;
                                        }
                                    }
                                }

                                // Draw
                                viz.clear();

                                // Gold foil representation (vertical strip)
                                var foilX = nucX - 2;
                                ctx.fillStyle = '#ffd70022';
                                ctx.fillRect(foilX - 8, 0, 16, h);
                                ctx.strokeStyle = viz.colors.gold + '44';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(foilX, 0);
                                ctx.lineTo(foilX, h);
                                ctx.stroke();
                                viz.screenText('Au foil', foilX, 14, viz.colors.gold, 10);

                                // Nucleus with glow
                                ctx.save();
                                var nucGlow = ctx.createRadialGradient(nucX, nucY, nucR * 0.5, nucX, nucY, nucR * 5);
                                nucGlow.addColorStop(0, 'rgba(255,215,0,0.5)');
                                nucGlow.addColorStop(1, 'rgba(255,215,0,0)');
                                ctx.fillStyle = nucGlow;
                                ctx.beginPath();
                                ctx.arc(nucX, nucY, nucR * 5, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.arc(nucX, nucY, nucR, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('Au', nucX, nucY);
                                ctx.restore();

                                // Draw beam source indicator
                                ctx.fillStyle = viz.colors.green + '88';
                                ctx.fillRect(0, nucY + beamOffset - 4, 18, 8);
                                viz.screenText('source', 9, nucY + beamOffset - 12, viz.colors.green, 9);

                                // Draw alpha particles and trails
                                for (var j = 0; j < alphas.length; j++) {
                                    var ap = alphas[j];
                                    // Trail
                                    if (ap.trail.length > 1) {
                                        ctx.beginPath();
                                        for (var ti = 0; ti < ap.trail.length; ti++) {
                                            var alpha = (ti / ap.trail.length) * 0.7;
                                            ctx.strokeStyle = 'rgba(248,81,73,' + alpha.toFixed(2) + ')';
                                            ctx.lineWidth = 1.5;
                                            if (ti === 0) {
                                                ctx.moveTo(ap.trail[ti][0], ap.trail[ti][1]);
                                            } else {
                                                ctx.beginPath();
                                                ctx.moveTo(ap.trail[ti - 1][0], ap.trail[ti - 1][1]);
                                                ctx.lineTo(ap.trail[ti][0], ap.trail[ti][1]);
                                                ctx.stroke();
                                            }
                                        }
                                    }
                                    // Particle
                                    if (ap.active) {
                                        ctx.save();
                                        ctx.shadowColor = viz.colors.red;
                                        ctx.shadowBlur = 8;
                                        ctx.fillStyle = viz.colors.red;
                                        ctx.beginPath();
                                        ctx.arc(ap.x, ap.y, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                }

                                // Impact parameter indicator
                                if (Math.abs(beamOffset) > 2) {
                                    ctx.strokeStyle = viz.colors.teal + '88';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath();
                                    ctx.moveTo(20, nucY);
                                    ctx.lineTo(nucX - 30, nucY);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(20, nucY + beamOffset);
                                    ctx.lineTo(nucX - 30, nucY + beamOffset);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                    // b label
                                    var midY = nucY + beamOffset / 2;
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(nucX - 40, nucY);
                                    ctx.lineTo(nucX - 40, nucY + beamOffset);
                                    ctx.stroke();
                                    viz.screenText('b', nucX - 50, midY, viz.colors.teal, 12);
                                }

                                // === Histogram (right side) ===
                                var histL = w * 0.68, histR = w - 15;
                                var histT = 25, histB = h - 25;
                                var histW = histR - histL, histH = histB - histT;

                                ctx.fillStyle = '#0a0a1a';
                                ctx.fillRect(histL, histT, histW, histH);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(histL, histT, histW, histH);

                                viz.screenText('Scattering Angle Distribution', histL + histW / 2, 14, viz.colors.white, 11);
                                viz.screenText('angle (deg)', histL + histW / 2, histB + 14, viz.colors.text, 9);

                                // Find max bin for scaling
                                var maxBin = 1;
                                for (var hb = 0; hb < histBins; hb++) {
                                    if (histogram[hb] > maxBin) maxBin = histogram[hb];
                                }

                                var barW = histW / histBins - 1;
                                for (var hb2 = 0; hb2 < histBins; hb2++) {
                                    var bx = histL + (hb2 / histBins) * histW + 0.5;
                                    var barH = (histogram[hb2] / maxBin) * (histH - 10);
                                    // Color: small angles green, large angles red
                                    var frac = hb2 / histBins;
                                    var hue = (1 - frac) * 120; // 120=green, 0=red
                                    ctx.fillStyle = VizEngine.hsl(hue, 70, 45) + 'cc';
                                    ctx.fillRect(bx, histB - barH, barW, barH);
                                }

                                // Angle labels
                                for (var al = 0; al <= 180; al += 60) {
                                    var ax = histL + (al / 180) * histW;
                                    viz.screenText(al + '\u00B0', ax, histB + 6, viz.colors.text, 8);
                                }

                                // Stats
                                viz.screenText('N = ' + totalScattered, histL + histW / 2, histT + 12, viz.colors.text, 10);

                                // Labels
                                viz.screenText('\u03B1 source', 9, h - 12, viz.colors.red, 9, 'left');
                                viz.screenText('b = impact parameter', nucX - 40, h - 12, viz.colors.teal, 9, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why was gold chosen for the foil in Rutherford\'s experiment?',
                        hint: 'Consider both the nuclear charge and the physical properties of gold.',
                        solution: 'Gold has a high atomic number (Z = 79), providing a strong Coulomb repulsion that makes scattering angles larger and easier to detect. Gold is also extremely malleable, allowing it to be beaten into foils only a few hundred atoms thick. A thin foil ensures that most alpha particles encounter at most one nucleus, simplifying the analysis.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Most Pass Through
            // ============================================================
            {
                id: 'most-pass-through',
                title: 'Most Pass Through',
                content: `
<h2>The Atom Is Mostly Empty Space</h2>

<p>The most important result of the gold foil experiment is what <em>didn't</em> happen: the vast majority of alpha particles passed straight through the foil with little or no deflection. This is perfectly consistent with (and required by) a nuclear model where almost all of the atom is empty space.</p>

<div class="env-block theorem">
<div class="env-title">Fraction of Area Occupied by the Nucleus</div>
<div class="env-body">
<p>The cross-sectional area of the nucleus compared to the atom:</p>
\\[\\frac{\\pi r_{\\text{nuc}}^2}{\\pi r_{\\text{atom}}^2} = \\left(\\frac{r_{\\text{nuc}}}{r_{\\text{atom}}}\\right)^2 \\approx \\left(\\frac{10^{-15}}{10^{-10}}\\right)^2 = 10^{-10}\\]
<p>Only about 1 part in \\(10^{10}\\) of the atom's cross-section is occupied by the nucleus. An alpha particle aimed randomly at an atom has a \\(\\sim 10^{-10}\\) chance of hitting the nucleus directly.</p>
</div>
</div>

<p>For a foil 400 atoms thick, the probability of a direct nuclear encounter is about \\(400 \\times 10^{-10} = 4 \\times 10^{-8}\\), still extremely small. Most alphas pass through all 400 atomic layers without getting close to any nucleus.</p>

<h3>Small-Angle Scattering</h3>

<p>Even alpha particles that don't hit the nucleus directly still feel the Coulomb repulsion at a distance. Those passing at moderate distances (large impact parameter \\(b\\)) experience a gentle push and deflect by a small angle, typically less than 1 degree. This is the most common outcome.</p>

<div class="env-block definition">
<div class="env-title">Definition: Impact Parameter</div>
<div class="env-body">
<p>The <strong>impact parameter</strong> \\(b\\) is the perpendicular distance between the alpha particle's initial trajectory and the nucleus. Small \\(b\\) means a close approach (large deflection); large \\(b\\) means a distant pass (small deflection).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">A bowling analogy</div>
<div class="env-body">
<p>Imagine rolling bowling balls across a football field that has a single marble glued to the center. Almost every ball rolls straight across without noticing the marble. Only a ball aimed almost exactly at the marble would bounce back. The marble is the nucleus; the football field is the atom.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If a gold foil is 1000 atoms thick and the nuclear cross-section fraction is \\(10^{-10}\\), what fraction of alpha particles undergo a direct nuclear collision?',
                        hint: 'Multiply the probability per layer by the number of layers.',
                        solution: 'Probability \\(\\approx 1000 \\times 10^{-10} = 10^{-7}\\), or about 1 in 10 million. The vast majority pass through unscattered.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Some Scatter Back
            // ============================================================
            {
                id: 'scatter-back',
                title: 'Some Scatter Back',
                content: `
<h2>The Incredible Backscatter</h2>

<p>About 1 in 8,000 alpha particles were deflected by more than 90 degrees, and a tiny fraction bounced almost straight back (scattering angles near 180 degrees). This was the result that shocked Rutherford and destroyed the plum pudding model.</p>

<h3>Why Thomson's Model Cannot Explain This</h3>

<p>In Thomson's model, the positive charge is spread uniformly over the entire atomic volume. The maximum Coulomb force an alpha particle can experience inside such a diffuse positive sphere is far too weak to produce large-angle deflection. A simple calculation shows:</p>

<div class="env-block theorem">
<div class="env-title">Maximum Deflection in Thomson's Model</div>
<div class="env-body">
<p>For an alpha particle passing through a Thomson atom of radius \\(R \\sim 10^{-10}\\) m with \\(Z = 79\\):</p>
\\[\\theta_{\\max} \\approx \\frac{2 Z e^2}{4\\pi\\epsilon_0 \\, m_\\alpha v^2 R} \\approx 0.02^\\circ\\]
<p>Even passing through 400 atoms, multiple scatterings add randomly (like a random walk), giving a total deflection of at most \\(0.02^\\circ \\times \\sqrt{400} \\approx 0.4^\\circ\\). A 90-degree deflection is impossible.</p>
</div>
</div>

<h3>Why a Nucleus Explains It</h3>

<p>If all the positive charge \\(Ze\\) is concentrated in a tiny nucleus of radius \\(\\sim 10^{-15}\\) m, then an alpha particle that passes close to the nucleus encounters an enormous Coulomb repulsion. The electric field at distance \\(r\\) from a point charge is:</p>

\\[E = \\frac{Ze}{4\\pi\\epsilon_0 r^2}\\]

<p>At \\(r = 10^{-14}\\) m, this field is \\(\\sim 10^{21}\\) V/m, more than enough to reverse the direction of a fast alpha particle.</p>

<div class="env-block remark">
<div class="env-title">The power of concentration</div>
<div class="env-body">
<p>The total positive charge in both models is the same (\\(Ze\\)). The difference is whether it is spread over \\(10^{-10}\\) m or concentrated in \\(10^{-15}\\) m. Concentrating the charge increases the maximum Coulomb force by a factor of \\((10^{-10}/10^{-15})^2 = 10^{10}\\). That is why a nucleus can scatter alphas backward and a Thomson atom cannot.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'In the Thomson model, why does passing through 400 atoms only give a total deflection of about 0.4 degrees rather than \\(400 \\times 0.02 = 8\\) degrees?',
                        hint: 'How do random deflections add up? Think about random walks.',
                        solution: 'Each atom deflects the alpha particle by up to 0.02 degrees, but in a random direction. Random deflections add in quadrature (like a random walk), so the total deflection scales as \\(\\theta_{\\text{total}} \\sim \\theta_{\\max} \\sqrt{N} = 0.02 \\times \\sqrt{400} = 0.4\\) degrees, not linearly. Large-angle scattering is exponentially suppressed in a multiple-small-scattering model.'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Nuclear Atom
            // ============================================================
            {
                id: 'nuclear-atom',
                title: 'The Nuclear Atom',
                content: `
<h2>Rutherford's Scattering Formula</h2>

<p>Rutherford worked out the exact mathematical relationship between the scattering angle \\(\\theta\\) and the impact parameter \\(b\\). The alpha particle follows a hyperbolic trajectory in the Coulomb potential of the nucleus, and the geometry gives:</p>

<div class="env-block theorem">
<div class="env-title">Rutherford Scattering Formula</div>
<div class="env-body">
<p>The impact parameter for scattering angle \\(\\theta\\):</p>
\\[b = \\frac{d}{2}\\cot\\frac{\\theta}{2}\\]
<p>where \\(d\\) is the <strong>distance of closest approach</strong> for a head-on collision:</p>
\\[d = \\frac{Z_1 Z_2 e^2}{4\\pi\\epsilon_0 \\, K_\\alpha}\\]
<p>and \\(K_\\alpha = \\frac{1}{2}m_\\alpha v^2\\) is the alpha particle's kinetic energy.</p>
</div>
</div>

<p>The fraction of particles scattered into a detector at angle \\(\\theta\\) (per unit solid angle) is the famous Rutherford cross-section:</p>

\\[\\frac{d\\sigma}{d\\Omega} = \\left(\\frac{d}{4}\\right)^2 \\frac{1}{\\sin^4(\\theta/2)}\\]

<div class="env-block remark">
<div class="env-title">The \\(1/\\sin^4(\\theta/2)\\) law</div>
<div class="env-body">
<p>This formula predicts that forward scattering (small \\(\\theta\\)) is overwhelmingly more probable than backward scattering (large \\(\\theta\\)). As \\(\\theta \\to 0\\), the cross-section diverges, meaning most particles scatter by tiny angles. At \\(\\theta = 180^\\circ\\), the cross-section is finite but very small. Geiger and Marsden's data confirmed this angular dependence precisely, validating the nuclear model.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Comparing Forward and Backward Scattering</div>
<div class="env-body">
<p>How much more likely is scattering at \\(10^\\circ\\) than at \\(90^\\circ\\)?</p>
\\[\\frac{\\sigma(10^\\circ)}{\\sigma(90^\\circ)} = \\frac{\\sin^4(45^\\circ)}{\\sin^4(5^\\circ)} = \\frac{0.25}{6.0 \\times 10^{-6}} \\approx 42{,}000\\]
<p>Scattering at 10 degrees is about 42,000 times more likely than at 90 degrees.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'For 5 MeV alpha particles on gold (\\(Z = 79\\)), calculate the distance of closest approach \\(d\\). Use \\(k_e = 8.99 \\times 10^9\\) N m\\(^2\\)/C\\(^2\\), \\(e = 1.6 \\times 10^{-19}\\) C.',
                        hint: 'Set kinetic energy equal to Coulomb potential energy: \\(K_\\alpha = k_e Z_1 Z_2 e^2 / d\\). Use \\(Z_1 = 2\\) for alpha, \\(Z_2 = 79\\) for gold. Convert 5 MeV to joules.',
                        solution: '\\(K = 5 \\times 10^6 \\times 1.6 \\times 10^{-19} = 8 \\times 10^{-13}\\) J. \\(d = k_e Z_1 Z_2 e^2 / K = (8.99 \\times 10^9)(2)(79)(1.6 \\times 10^{-19})^2 / (8 \\times 10^{-13}) = 4.55 \\times 10^{-14}\\) m \\(\\approx 45\\) fm. This is much larger than the gold nucleus (\\(\\approx 7\\) fm), confirming the alpha never touches the nucleus.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Calculating the Nucleus Size
            // ============================================================
            {
                id: 'nucleus-size',
                title: 'Calculating the Nucleus Size',
                content: `
<h2>Upper Bound on Nuclear Radius</h2>

<p>Rutherford's scattering formula assumes a point-like nucleus (pure Coulomb field). This works as long as the alpha particle does not actually touch the nuclear surface. If it gets close enough to enter the nucleus, the scattering pattern will deviate from the Coulomb prediction because nuclear forces (strong force) take over.</p>

<div class="env-block theorem">
<div class="env-title">Nuclear Radius from Scattering</div>
<div class="env-body">
<p>The distance of closest approach for a head-on collision (\\(\\theta = 180^\\circ\\), \\(b = 0\\)) sets an <strong>upper bound</strong> on the nuclear radius:</p>
\\[r_{\\text{nuc}} \\leq d = \\frac{2 Z_\\text{Au} \\, k_e e^2}{K_\\alpha}\\]
<p>If the Rutherford formula holds even for the largest-angle scattering observed, then the nucleus must be smaller than \\(d\\).</p>
</div>
</div>

<p>For 5 MeV alphas on gold, we found \\(d \\approx 45\\) fm. Since the Rutherford formula accurately predicted the observed scattering at all angles measured, Rutherford concluded that the gold nucleus must be smaller than about 45 fm. (Modern measurements give \\(r_{\\text{Au}} \\approx 7\\) fm.)</p>

<h3>Modern Nuclear Radius Formula</h3>

<p>Electron scattering experiments (which probe much smaller distances) have established:</p>

\\[r = r_0 \\, A^{1/3}, \\qquad r_0 \\approx 1.2 \\text{ fm}\\]

<p>where \\(A\\) is the mass number. This \\(A^{1/3}\\) scaling implies that nuclear density is approximately constant: nucleons are packed at roughly the same density regardless of the nucleus.</p>

<div class="env-block example">
<div class="env-title">Example: Gold Nucleus Radius</div>
<div class="env-body">
<p>For \\({}^{197}\\text{Au}\\): \\(r = 1.2 \\times 197^{1/3} = 1.2 \\times 5.82 = 6.98\\) fm \\(\\approx 7\\) fm.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Nuclear density</div>
<div class="env-body">
<p>Since \\(V \\propto r^3 \\propto A\\), the volume is proportional to the number of nucleons. This means each nucleon occupies roughly the same volume, giving a nuclear density of about \\(2.3 \\times 10^{17}\\) kg/m\\(^3\\). A teaspoon of nuclear matter would weigh about a billion tons.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Rutherford's method gives only an upper bound</div>
<div class="env-body">
<p>Because the alpha particle is repelled before reaching the nucleus, Rutherford could only say "the nucleus is no larger than \\(d\\)." Measuring the actual nuclear radius requires higher-energy probes (faster particles that penetrate closer) or fundamentally different techniques (electron scattering, which does not feel the strong force).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Calculate the radius of a carbon-12 nucleus using the formula \\(r = r_0 A^{1/3}\\) with \\(r_0 = 1.2\\) fm.',
                        hint: '\\(A = 12\\) for carbon-12. Compute \\(12^{1/3}\\).',
                        solution: '\\(r = 1.2 \\times 12^{1/3} = 1.2 \\times 2.289 = 2.75\\) fm.'
                    },
                    {
                        question: 'If you wanted to probe the actual surface of a gold nucleus (\\(r \\approx 7\\) fm), what minimum kinetic energy would the alpha particle need? (Assume head-on collision.)',
                        hint: 'Set \\(d = r_{\\text{nuc}}\\) in the distance of closest approach formula and solve for \\(K\\).',
                        solution: '\\(K = k_e Z_1 Z_2 e^2 / r_{\\text{nuc}} = (8.99 \\times 10^9)(2)(79)(1.6 \\times 10^{-19})^2 / (7 \\times 10^{-15}) = 5.2 \\times 10^{-12}\\) J \\(= 32.5\\) MeV. You need alpha particles with about 32 MeV to probe the nuclear surface.'
                    }
                ]
            }
        ]
    });
})();
