// === Chapter 7: Matter Waves & de Broglie ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch07',
        number: 7,
        title: 'Matter Waves & de Broglie',
        subtitle: 'Electrons have wavelengths, and they prove it by diffracting',
        file: 'ch07-de-broglie',

        sections: [
            // ============================================================
            // Section 0: Particles Have Wavelengths
            // ============================================================
            {
                id: 'particles-have-wavelengths',
                title: 'Particles Have Wavelengths',
                content: `
<h2>A Bold Symmetry</h2>

<p>In 1924, a young French physicist named Louis de Broglie made one of the most audacious proposals in the history of science. Light, long thought to be a wave, had been shown to have particle properties (photons). De Broglie asked: if waves can behave as particles, can particles behave as waves?</p>

<p>His reasoning was grounded in symmetry. The photon relations \\(E = h\\nu\\) and \\(p = h/\\lambda\\) connect wave properties (\\(\\nu\\), \\(\\lambda\\)) to particle properties (\\(E\\), \\(p\\)). De Broglie proposed that these same relations apply to <em>all</em> matter, not just photons.</p>

<div class="env-block theorem">
<div class="env-title">De Broglie Hypothesis</div>
<div class="env-body">
<p>Every particle with momentum \\(p\\) has an associated wavelength:</p>
\\[\\lambda = \\frac{h}{p} = \\frac{h}{mv}\\]
<p>where \\(h = 6.626 \\times 10^{-34}\\) J\\(\\cdot\\)s is Planck's constant, \\(m\\) is the particle's mass, and \\(v\\) is its velocity (for non-relativistic particles).</p>
</div>
</div>

<p>This is the de Broglie wavelength. Every moving object, from an electron to a baseball, has a wavelength. The reason we never notice the wave nature of baseballs is that their de Broglie wavelength is absurdly small.</p>

<div class="env-block example">
<div class="env-title">Example: Wavelength Comparison</div>
<div class="env-body">
<p><strong>Electron</strong> (\\(m = 9.1 \\times 10^{-31}\\) kg) at \\(v = 10^6\\) m/s:</p>
\\[\\lambda = \\frac{6.626 \\times 10^{-34}}{(9.1 \\times 10^{-31})(10^6)} = 7.3 \\times 10^{-10} \\text{ m} = 0.73 \\text{ nm}\\]
<p>This is comparable to atomic spacings in crystals, so electron diffraction is observable.</p>

<p><strong>Baseball</strong> (\\(m = 0.145\\) kg) at \\(v = 40\\) m/s:</p>
\\[\\lambda = \\frac{6.626 \\times 10^{-34}}{(0.145)(40)} = 1.1 \\times 10^{-34} \\text{ m}\\]
<p>This is about \\(10^{-19}\\) times smaller than a proton. No experiment could ever detect this wavelength. Classical physics is a perfectly good description for baseballs.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">When do matter waves matter?</div>
<div class="env-body">
<p>The de Broglie wavelength becomes important when it is comparable to the size of the structures the particle encounters. For electrons (\\(\\lambda \\sim 0.1{-}1\\) nm), this happens with atoms, molecules, and crystal lattices. For macroscopic objects, the wavelength is so small that wave effects are completely negligible, and classical mechanics applies perfectly.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-double-slit-showpiece"></div>
`,
                visualizations: [
                    {
                        id: 'viz-double-slit-showpiece',
                        title: 'Electron Double-Slit Experiment',
                        description: 'Electrons are fired one at a time through two slits. Each electron arrives as a single dot (particle!), but over time the dots build up an <strong>interference pattern</strong> (wave!). This is one of the most profound demonstrations in all of physics. Use the slider to adjust the de Broglie wavelength.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var lambdaFactor = 1.0; // relative wavelength
                            VizEngine.createSlider(controls, 'de Broglie \u03BB', 0.3, 2.0, lambdaFactor, 0.05, function (v) {
                                lambdaFactor = v;
                                dots = [];
                                dotCount = 0;
                            });

                            var clearBtn = VizEngine.createButton(controls, 'Clear', function () {
                                dots = [];
                                dotCount = 0;
                            });

                            // Screen layout
                            var slitX = w * 0.3;
                            var screenX = w * 0.7;
                            var screenT = 30, screenB = h - 30;
                            var screenH = screenB - screenT;
                            var screenCenter = (screenT + screenB) / 2;

                            // Slit parameters
                            var slitSep = 50;  // pixels between slit centers
                            var slitWidth = 6; // pixel width of each slit
                            var slit1Y = screenCenter - slitSep / 2;
                            var slit2Y = screenCenter + slitSep / 2;

                            // Detected dots
                            var dots = [];
                            var dotCount = 0;
                            var maxDots = 4000;

                            // Interference pattern: double slit intensity
                            // I(y) = cos^2(pi * d * y / (lambda * L)) * sinc^2(pi * a * y / (lambda * L))
                            function interferenceProb(y) {
                                var yOff = y - screenCenter;
                                var L = screenX - slitX;
                                var lam = 12 * lambdaFactor; // effective wavelength in pixels
                                var d = slitSep;
                                var a = slitWidth;

                                var argD = Math.PI * d * yOff / (lam * L);
                                var argA = Math.PI * a * yOff / (lam * L);

                                var doubleSlit = Math.cos(argD);
                                doubleSlit = doubleSlit * doubleSlit;

                                var sinc = 1;
                                if (Math.abs(argA) > 0.001) {
                                    sinc = Math.sin(argA) / argA;
                                }
                                sinc = sinc * sinc;

                                return doubleSlit * sinc;
                            }

                            // Pre-compute CDF for rejection sampling
                            function sampleY() {
                                // Rejection sampling
                                for (var tries = 0; tries < 100; tries++) {
                                    var y = screenT + Math.random() * screenH;
                                    var prob = interferenceProb(y);
                                    if (Math.random() < prob) return y;
                                }
                                return screenCenter + (Math.random() - 0.5) * screenH * 0.5;
                            }

                            var emitTimer = 0;
                            var flyingElectrons = [];
                            var lastTime = performance.now();

                            function draw(now) {
                                var dt = Math.min((now - lastTime) / 1000, 0.03);
                                lastTime = now;

                                // Emit new electrons from the left
                                emitTimer += dt;
                                var rate = 30; // electrons per second
                                while (emitTimer > 1 / rate && dotCount < maxDots) {
                                    emitTimer -= 1 / rate;
                                    // Determine final y position based on interference
                                    var finalY = sampleY();

                                    flyingElectrons.push({
                                        x: 15,
                                        y: screenCenter + (Math.random() - 0.5) * 20,
                                        targetY: finalY,
                                        vx: 350,
                                        phase: 'to-slit' // 'to-slit', 'to-screen'
                                    });
                                }

                                // Update flying electrons
                                for (var i = flyingElectrons.length - 1; i >= 0; i--) {
                                    var el = flyingElectrons[i];
                                    el.x += el.vx * dt;

                                    if (el.phase === 'to-slit' && el.x >= slitX) {
                                        el.phase = 'to-screen';
                                        // Fan out from slit
                                        el.y = (Math.random() < 0.5) ? slit1Y : slit2Y;
                                    }

                                    if (el.phase === 'to-screen') {
                                        // Drift toward target Y
                                        var frac = (el.x - slitX) / (screenX - slitX);
                                        el.y = VizEngine.lerp(el.y, el.targetY, frac * frac * 0.3);
                                    }

                                    if (el.x >= screenX) {
                                        // Hit screen
                                        if (dotCount < maxDots) {
                                            dots.push({ x: screenX + Math.random() * 3, y: el.targetY });
                                            dotCount++;
                                        }
                                        flyingElectrons.splice(i, 1);
                                    }
                                }

                                // Draw
                                viz.clear();

                                // Source
                                ctx.save();
                                ctx.shadowColor = viz.colors.green;
                                ctx.shadowBlur = 12;
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.arc(20, screenCenter, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                                viz.screenText('e\u207b source', 20, screenCenter + 18, viz.colors.green, 9);

                                // Slit barrier
                                ctx.fillStyle = '#3a3a5a';
                                ctx.fillRect(slitX - 3, screenT, 6, slit1Y - slitWidth / 2 - screenT);
                                ctx.fillRect(slitX - 3, slit1Y + slitWidth / 2, 6, slit2Y - slitWidth / 2 - slit1Y - slitWidth / 2 + slitWidth);
                                // Between slits
                                ctx.fillRect(slitX - 3, slit1Y + slitWidth / 2, 6, (slit2Y - slitWidth / 2) - (slit1Y + slitWidth / 2));
                                // Below slit 2
                                ctx.fillRect(slitX - 3, slit2Y + slitWidth / 2, 6, screenB - slit2Y - slitWidth / 2);

                                // Clear slit openings
                                ctx.fillStyle = viz.colors.bg;
                                ctx.fillRect(slitX - 3, slit1Y - slitWidth / 2, 6, slitWidth);
                                ctx.fillRect(slitX - 3, slit2Y - slitWidth / 2, 6, slitWidth);

                                // Re-draw slit openings with glow
                                ctx.fillStyle = 'rgba(63,185,160,0.3)';
                                ctx.fillRect(slitX - 3, slit1Y - slitWidth / 2, 6, slitWidth);
                                ctx.fillRect(slitX - 3, slit2Y - slitWidth / 2, 6, slitWidth);

                                // Detection screen background
                                ctx.fillStyle = '#080818';
                                ctx.fillRect(screenX, screenT, w - screenX - 10, screenH);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(screenX, screenT, w - screenX - 10, screenH);

                                // Draw accumulated dots
                                for (var d = 0; d < dots.length; d++) {
                                    var dot = dots[d];
                                    ctx.fillStyle = 'rgba(63,185,80,0.8)';
                                    ctx.fillRect(dot.x, dot.y - 0.5, 1.5, 1.5);
                                }

                                // Flying electrons
                                for (var fi = 0; fi < flyingElectrons.length; fi++) {
                                    var fe = flyingElectrons[fi];
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.blue;
                                    ctx.shadowBlur = 8;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.arc(fe.x, fe.y, 2.5, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                }

                                // Theoretical pattern overlay (faint)
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1.5;
                                ctx.globalAlpha = 0.5;
                                ctx.beginPath();
                                for (var py = screenT; py <= screenB; py++) {
                                    var prob = interferenceProb(py);
                                    var px = screenX + prob * (w - screenX - 15) * 0.85;
                                    if (py === screenT) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                ctx.globalAlpha = 1;

                                // Count and labels
                                viz.screenText('Electrons: ' + dotCount, screenX + (w - screenX - 10) / 2, screenT - 10, viz.colors.white, 11);
                                viz.screenText('Double Slit', slitX, screenT - 10, viz.colors.text, 10);
                                viz.screenText('Detection Screen', screenX + (w - screenX - 10) / 2, screenB + 15, viz.colors.text, 10);

                                // Phase explanation
                                if (dotCount < 20) {
                                    viz.screenText('Few electrons: random dots (particle!)', w / 2, h - 10, viz.colors.yellow, 10);
                                } else if (dotCount < 200) {
                                    viz.screenText('Pattern emerging...', w / 2, h - 10, viz.colors.yellow, 10);
                                } else {
                                    viz.screenText('Interference pattern! (wave!)', w / 2, h - 10, viz.colors.green, 10);
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Watch the simulation. At first, with only a few dots, can you tell there is a pattern? At what point does the interference pattern become visible?',
                        hint: 'Let the simulation run for a while and watch the dots accumulate.',
                        solution: 'With only a few dozen electrons, the dots appear random. The interference pattern starts becoming visible around 100-200 electrons, and becomes unmistakable after 500+. Each individual electron arrives at a definite spot (particle behavior), but the probability of where it lands is governed by wave interference. This is the essence of quantum mechanics: probabilistic wave behavior manifesting through individual particle events.'
                    }
                ]
            },

            // ============================================================
            // Section 1: lambda = h/p
            // ============================================================
            {
                id: 'lambda-h-over-p',
                title: '\u03BB = h/p',
                content: `
<h2>The de Broglie Wavelength in Detail</h2>

<p>The de Broglie relation \\(\\lambda = h/p\\) has several important implications.</p>

<h3>Wavelength Depends on Momentum, Not Speed Alone</h3>

<p>Since \\(p = mv\\), heavier particles at the same speed have shorter wavelengths. This means that for diffraction experiments, lighter particles are better because they produce more widely spaced interference patterns.</p>

<div class="env-block theorem">
<div class="env-title">De Broglie Wavelength for Accelerated Particles</div>
<div class="env-body">
<p>An electron accelerated through a potential difference \\(V\\) acquires kinetic energy \\(eV = \\frac{1}{2}mv^2\\), so \\(p = \\sqrt{2meV}\\) and:</p>
\\[\\lambda = \\frac{h}{\\sqrt{2meV}} = \\frac{1.226}{\\sqrt{V}} \\text{ nm}\\]
<p>where \\(V\\) is in volts. At 100 V, \\(\\lambda = 0.123\\) nm; at 10,000 V, \\(\\lambda = 0.0123\\) nm.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Electrons in an Electron Microscope</div>
<div class="env-body">
<p>A scanning electron microscope operates at 20,000 V. The electron wavelength is:</p>
\\[\\lambda = \\frac{1.226}{\\sqrt{20000}} = \\frac{1.226}{141} = 0.0087 \\text{ nm} = 0.087 \\text{ \\AA}\\]
<p>This is much shorter than visible light (400-700 nm), which is why electron microscopes can resolve structures far smaller than optical microscopes.</p>
</div>
</div>

<h3>Thermal de Broglie Wavelength</h3>

<p>Particles in thermal equilibrium have average kinetic energy \\(\\frac{3}{2}k_BT\\), giving a thermal de Broglie wavelength:</p>

\\[\\lambda_{\\text{th}} = \\frac{h}{\\sqrt{3mk_BT}}\\]

<p>For heavy particles at high temperature, \\(\\lambda_{\\text{th}}\\) is much smaller than the average particle spacing, and classical physics applies. When \\(\\lambda_{\\text{th}}\\) becomes comparable to the particle spacing, quantum effects dominate. This criterion separates classical from quantum regimes.</p>

<div class="env-block remark">
<div class="env-title">Why we don't see quantum effects in everyday life</div>
<div class="env-body">
<p>A dust grain (\\(m \\sim 10^{-15}\\) kg) at room temperature has \\(\\lambda_{\\text{th}} \\sim 10^{-18}\\) m, far smaller than even a proton. To observe quantum behavior in macroscopic objects, you need extremely low temperatures and small masses. This is why quantum mechanics was not discovered until physicists began probing atomic-scale phenomena.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An electron is accelerated from rest through 150 V. What is its de Broglie wavelength? How does this compare with the spacing between atoms in a crystal (~0.3 nm)?',
                        hint: 'Use \\(\\lambda = 1.226/\\sqrt{V}\\) nm.',
                        solution: '\\(\\lambda = 1.226/\\sqrt{150} = 1.226/12.25 = 0.100\\) nm. This is comparable to typical crystal spacings (0.2-0.4 nm), which is why electrons accelerated through ~100 V are ideal for crystal diffraction experiments.'
                    },
                    {
                        question: 'Calculate the de Broglie wavelength of a neutron (\\(m = 1.67 \\times 10^{-27}\\) kg) moving at 2200 m/s (thermal speed at room temperature).',
                        hint: 'Use \\(\\lambda = h/(mv)\\).',
                        solution: '\\(\\lambda = 6.626 \\times 10^{-34} / (1.67 \\times 10^{-27} \\times 2200) = 1.80 \\times 10^{-10}\\) m = 0.18 nm. This is again comparable to atomic spacings, so thermal neutrons can also be used for crystal diffraction (neutron scattering is an important tool in condensed matter physics).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Electron Diffraction
            // ============================================================
            {
                id: 'electron-diffraction',
                title: 'Electron Diffraction',
                content: `
<h2>Electrons Act Like Waves</h2>

<p>If electrons have wavelengths, they should diffract when passing through structures comparable in size to their wavelength. For electrons accelerated through ~100 V (\\(\\lambda \\sim 0.1\\) nm), the natural "diffraction grating" is a crystal, whose atomic planes are spaced about 0.2-0.3 nm apart.</p>

<p>In 1927, two independent experiments confirmed electron diffraction:</p>

<ul>
<li><strong>Davisson and Germer</strong> (at Bell Labs, USA) scattered electrons off a nickel crystal surface and observed sharp intensity peaks at specific angles, exactly matching the Bragg diffraction condition for waves with the de Broglie wavelength.</li>
<li><strong>Thomson and Reid</strong> (at Aberdeen, Scotland) passed electrons through thin gold foil and observed concentric diffraction rings on a photographic plate, identical in structure to X-ray diffraction patterns.</li>
</ul>

<div class="env-block theorem">
<div class="env-title">Bragg's Law for Electron Diffraction</div>
<div class="env-body">
\\[n\\lambda = 2d\\sin\\theta\\]
<p>where \\(d\\) is the spacing between crystal planes, \\(\\theta\\) is the angle of incidence/reflection, and \\(n\\) is a positive integer. This is the same law used for X-ray diffraction, confirming that electrons obey the same wave optics as light.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Ironic Nobel history</div>
<div class="env-body">
<p>J.J. Thomson won the Nobel Prize in 1906 for discovering the electron as a <em>particle</em>. His son, G.P. Thomson, won the Nobel Prize in 1937 for demonstrating that the electron is a <em>wave</em>. Both were correct. The electron is a quantum object that exhibits both properties.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Electron Diffraction from Nickel</div>
<div class="env-body">
<p>In the Davisson-Germer experiment, electrons accelerated through 54 V were scattered from nickel crystal planes with spacing \\(d = 0.091\\) nm. A strong diffraction peak appeared at \\(\\theta = 50\\degree\\) from the crystal surface.</p>
<p>The de Broglie wavelength: \\(\\lambda = 1.226/\\sqrt{54} = 0.167\\) nm.</p>
<p>The Bragg condition gives: \\(\\lambda = 2(0.091)\\sin(65\\degree) = 0.165\\) nm.</p>
<p>The agreement is excellent, confirming de Broglie's hypothesis.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Electrons are diffracted from crystal planes spaced \\(d = 0.20\\) nm apart. If the first-order (\\(n=1\\)) Bragg peak appears at \\(\\theta = 30\\degree\\), what is the electron wavelength?',
                        hint: 'Apply Bragg\'s law: \\(\\lambda = 2d\\sin\\theta\\).',
                        solution: '\\(\\lambda = 2(0.20)\\sin(30\\degree) = 2(0.20)(0.5) = 0.20\\) nm. Through what voltage were the electrons accelerated? \\(V = (1.226/\\lambda)^2 = (1.226/0.20)^2 = 37.6\\) V.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Davisson-Germer
            // ============================================================
            {
                id: 'davisson-germer',
                title: 'Davisson-Germer',
                content: `
<h2>The Accidental Discovery</h2>

<p>The Davisson-Germer experiment is one of the great stories of accidental discovery in physics. Clinton Davisson and Lester Germer at Bell Labs were studying electron scattering from polycrystalline nickel, expecting smooth, featureless scattering patterns (as predicted by classical physics). Then an accident changed everything.</p>

<p>During the experiment, the vacuum system broke and air leaked into the chamber. The nickel target oxidized. To clean it, Davisson and Germer heated the target to high temperature. This annealing accidentally converted the polycrystalline nickel into a few large single crystals. When they resumed the experiment, the smooth scattering pattern was replaced by sharp intensity peaks at specific angles.</p>

<p>At first, they did not understand what they were seeing. Then Davisson attended a conference in Oxford where he learned of de Broglie's wave hypothesis. He realized that the peaks were Bragg diffraction peaks: the electrons were diffracting off the crystal planes like X-rays. The wavelengths calculated from the diffraction angles matched de Broglie's prediction perfectly.</p>

<div class="env-block remark">
<div class="env-title">The role of accident in science</div>
<div class="env-body">
<p>Davisson and Germer were not looking for electron diffraction. They were performing a routine industrial study of electron scattering. A broken vacuum system, an accidental annealing, and a chance encounter at a conference combined to produce one of the most important experiments in quantum mechanics. As Pasteur said, "Fortune favors the prepared mind."</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Verifying De Broglie at 54 V</div>
<div class="env-body">
<p>The key measurement: electrons at 54 V produced a strong peak at 50\u00b0 from the nickel surface. The predicted de Broglie wavelength is:</p>
\\[\\lambda = \\frac{1.226}{\\sqrt{54}} = 0.167 \\text{ nm}\\]
<p>The nickel crystal spacing is \\(d = 0.215\\) nm. The scattering geometry gives an effective glancing angle. Applying the appropriate diffraction formula yields a wavelength of 0.165 nm, in agreement with de Broglie to within 1%.</p>
</div>
</div>

<p>The confirmation of de Broglie's hypothesis earned him the Nobel Prize in Physics in 1929, and Davisson shared the 1937 Nobel Prize with G.P. Thomson.</p>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If Davisson and Germer had used electrons at 200 V instead of 54 V, what would happen to the diffraction peaks?',
                        hint: 'Higher voltage means shorter wavelength. How does this affect the Bragg angles?',
                        solution: 'At 200 V, \\(\\lambda = 1.226/\\sqrt{200} = 0.087\\) nm, about half the wavelength at 54 V. From Bragg\'s law \\(\\sin\\theta = n\\lambda/(2d)\\), smaller \\(\\lambda\\) gives smaller \\(\\sin\\theta\\), so the diffraction peaks shift to smaller angles. The peaks also become sharper because more crystal planes contribute constructively.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Wave Functions Preview
            // ============================================================
            {
                id: 'wave-functions-preview',
                title: 'Wave Functions Preview',
                content: `
<h2>What Is Waving?</h2>

<p>When we say an electron has a wavelength, a natural question arises: what is doing the waving? For water waves, water oscillates. For sound waves, air pressure oscillates. For light waves, electric and magnetic fields oscillate. But for matter waves, what oscillates?</p>

<p>The answer came from Erwin Schr&ouml;dinger (1926) and Max Born (1926). The "wave" associated with a particle is a mathematical function called the <strong>wave function</strong>, denoted \\(\\Psi(x, t)\\). It does not represent a physical oscillation of anything material.</p>

<div class="env-block definition">
<div class="env-title">Definition: Wave Function</div>
<div class="env-body">
<p>The <strong>wave function</strong> \\(\\Psi(x, t)\\) is a complex-valued function whose squared magnitude \\(|\\Psi(x, t)|^2\\) gives the probability density of finding the particle at position \\(x\\) at time \\(t\\). Specifically:</p>
\\[P(a \\leq x \\leq b) = \\int_a^b |\\Psi(x,t)|^2 \\, dx\\]
</div>
</div>

<div class="env-block intuition">
<div class="env-title">What the double-slit experiment teaches us</div>
<div class="env-body">
<p>In the double-slit experiment, each electron arrives at a definite point on the screen (particle behavior). But the <em>probability</em> of arriving at each point is determined by the interference of the wave function passing through both slits (wave behavior). The wave function goes through both slits simultaneously, interferes with itself, and then "collapses" to a single point when the electron is detected.</p>
<p>No one can predict where any individual electron will land. But the statistical distribution of many electrons is precisely determined by \\(|\\Psi|^2\\).</p>
</div>
</div>

<p>This is the core strangeness of quantum mechanics. The electron does not "choose" a slit. The wave function passes through both. If you try to determine which slit the electron went through (by placing a detector at one slit), the interference pattern disappears. The act of observation changes the outcome.</p>

<div class="env-block remark">
<div class="env-title">Born's probability interpretation</div>
<div class="env-body">
<p>Max Born's interpretation of \\(|\\Psi|^2\\) as a probability density was controversial at first. Einstein famously objected, saying "God does not play dice." But Born was right: quantum mechanics is fundamentally probabilistic. The wave function gives complete information about the system; there is nothing more to know. The randomness is not due to ignorance but is built into the fabric of nature.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Common misconception</div>
<div class="env-body">
<p>"The electron is a tiny ball that follows a wave-shaped path." This is wrong. The electron is not a ball. It does not have a definite position until measured. The wave function describes the probability of <em>finding</em> the electron at various locations. Between measurements, the electron does not have a trajectory. This is not a limitation of our knowledge; it is how nature works at the quantum level.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'In the double-slit experiment, why does the interference pattern disappear if you place a detector at one slit to determine which slit each electron passes through?',
                        hint: 'Think about what happens to the wave function when you gain which-path information.',
                        solution: 'When you detect which slit the electron passes through, the wave function no longer passes through both slits simultaneously. It is localized to one slit, so there is nothing to interfere with. The resulting pattern is the sum of two single-slit patterns, with no interference fringes. This illustrates complementarity: you can observe particle behavior (which slit) or wave behavior (interference), but not both simultaneously.'
                    },
                    {
                        question: 'If \\(|\\Psi(x)|^2 = 0\\) at a certain position \\(x\\), what is the probability of finding the electron there?',
                        hint: 'What does the probability density tell you?',
                        solution: 'Zero. If \\(|\\Psi(x)|^2 = 0\\), there is zero probability of finding the electron at that position. In the double-slit experiment, the dark fringes correspond to positions where \\(|\\Psi|^2 = 0\\) due to destructive interference. No electrons ever land at these positions, no matter how long you wait.'
                    }
                ]
            }
        ]
    });
})();
