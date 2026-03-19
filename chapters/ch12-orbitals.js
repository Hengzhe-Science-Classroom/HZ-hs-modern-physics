// === Chapter 12: Quantum Numbers & Orbitals ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch12',
        number: 12,
        title: 'Quantum Numbers & Orbitals',
        subtitle: 'Four quantum numbers, electron clouds, and the architecture of the periodic table',
        file: 'ch12-orbitals',

        sections: [
            // ============================================================
            // Section 0: Four Quantum Numbers
            // ============================================================
            {
                id: 'quantum-numbers',
                title: 'Four Quantum Numbers',
                content: `
<h2>The Quantum Address of an Electron</h2>

<p>In the full quantum mechanical treatment of the hydrogen atom (Schrodinger's equation), each electron state is described by four quantum numbers. Together, they specify everything about the electron's state, like a complete address: country, city, street, and house number.</p>

<div class="env-block theorem">
<div class="env-title">The Four Quantum Numbers</div>
<div class="env-body">
<ol>
<li><strong>Principal quantum number</strong> \\(n = 1, 2, 3, \\ldots\\)
<br>Determines the energy level and the overall size of the orbital. Larger \\(n\\) means higher energy and larger orbital.</li>

<li><strong>Angular momentum quantum number</strong> \\(l = 0, 1, 2, \\ldots, n-1\\)
<br>Determines the shape of the orbital. Letter codes: \\(l = 0\\) (s), \\(l = 1\\) (p), \\(l = 2\\) (d), \\(l = 3\\) (f).</li>

<li><strong>Magnetic quantum number</strong> \\(m_l = -l, -l+1, \\ldots, 0, \\ldots, l-1, l\\)
<br>Determines the orientation of the orbital in space. For each \\(l\\), there are \\(2l + 1\\) possible orientations.</li>

<li><strong>Spin quantum number</strong> \\(m_s = +\\frac{1}{2}\\) or \\(-\\frac{1}{2}\\)
<br>The electron's intrinsic spin. Each orbital can hold at most 2 electrons (one spin-up, one spin-down).</li>
</ol>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Counting States in n = 2</div>
<div class="env-body">
<p>For \\(n = 2\\):</p>
<ul>
<li>\\(l = 0\\) (2s): \\(m_l = 0\\). One orbital, 2 electrons.</li>
<li>\\(l = 1\\) (2p): \\(m_l = -1, 0, +1\\). Three orbitals, 6 electrons.</li>
</ul>
<p>Total: 4 orbitals, 8 electrons maximum in the \\(n = 2\\) shell.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Maximum Electrons per Shell</div>
<div class="env-body">
<p>The maximum number of electrons in shell \\(n\\) is:</p>
\\[N_{\\max} = 2n^2\\]
<p>Shell 1: 2. Shell 2: 8. Shell 3: 18. Shell 4: 32.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-orbital-cloud"></div>
`,
                visualizations: [
                    {
                        id: 'viz-orbital-cloud',
                        title: 'Electron Probability Clouds',
                        description: 'Select an orbital to visualize its electron probability density. Dots represent where the electron is likely to be found (denser = higher probability). Color indicates wave function sign (phase): <span style="color:#58a6ff">blue = positive</span>, <span style="color:#f0883e">orange = negative</span>. The radial distribution plot (right) shows \\(P(r) = r^2|R(r)|^2\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Cloud display area
                            var cloudCx = w * 0.33, cloudCy = h * 0.45;
                            var cloudSize = Math.min(w * 0.4, h * 0.7);

                            // Radial plot area
                            var rpL = w * 0.62, rpR = w - 20;
                            var rpT = 35, rpB = h - 30;
                            var rpW = rpR - rpL, rpH = rpB - rpT;

                            // Orbital definitions
                            var orbitals = [
                                { name: '1s', n: 1, l: 0, ml: 0 },
                                { name: '2s', n: 2, l: 0, ml: 0 },
                                { name: '2p', n: 2, l: 1, ml: 0 },
                                { name: '3s', n: 3, l: 0, ml: 0 },
                                { name: '3p', n: 3, l: 1, ml: 0 },
                                { name: '3d', n: 3, l: 2, ml: 0 }
                            ];

                            var currentOrbital = 0;

                            // Create orbital selector buttons
                            for (var oi = 0; oi < orbitals.length; oi++) {
                                (function (idx) {
                                    VizEngine.createButton(controls, orbitals[idx].name, function () {
                                        currentOrbital = idx;
                                        generateCloud();
                                    });
                                })(oi);
                            }

                            // Hydrogen radial functions (simplified, normalized for display)
                            // R_{n,l}(r) * r^l * exp(-r/(n*a0)) with appropriate polynomials
                            // We use a0 = 1 (atomic units for display)

                            function radialWF(n, l, r) {
                                // Simplified hydrogen radial wavefunctions
                                var rho = 2 * r / n;
                                if (n === 1 && l === 0) {
                                    return 2 * Math.exp(-rho / 2);
                                } else if (n === 2 && l === 0) {
                                    return (1 / (2 * Math.sqrt(2))) * (2 - rho) * Math.exp(-rho / 2);
                                } else if (n === 2 && l === 1) {
                                    return (1 / (2 * Math.sqrt(6))) * rho * Math.exp(-rho / 2);
                                } else if (n === 3 && l === 0) {
                                    return (2 / (81 * Math.sqrt(3))) * (27 - 18 * rho + 2 * rho * rho) * Math.exp(-rho / 2);
                                } else if (n === 3 && l === 1) {
                                    return (8 / (27 * Math.sqrt(6))) * (6 - rho) * rho * Math.exp(-rho / 2);
                                } else if (n === 3 && l === 2) {
                                    return (4 / (81 * Math.sqrt(30))) * rho * rho * Math.exp(-rho / 2);
                                }
                                return 0;
                            }

                            // Angular part Y_{l,m}(theta, phi) evaluated at phi=0 cross-section
                            // For display, we show the xz cross-section (phi=0)
                            function angularFactor(l, ml, cosTheta) {
                                if (l === 0) return 0.2821; // Y_00
                                if (l === 1 && ml === 0) return 0.4886 * cosTheta; // Y_10
                                if (l === 2 && ml === 0) return 0.3154 * (3 * cosTheta * cosTheta - 1); // Y_20
                                return 0.2821;
                            }

                            // Generate dot cloud
                            var cloudDots = [];
                            var maxDots = 2500;

                            function generateCloud() {
                                cloudDots = [];
                                var orb = orbitals[currentOrbital];
                                var n = orb.n, l = orb.l, ml = orb.ml;

                                // Scale factor: larger n needs larger display range
                                var rMax = n * n * 3 + 5; // in a0 units

                                var attempts = 0;
                                var maxAttempts = maxDots * 30;

                                while (cloudDots.length < maxDots && attempts < maxAttempts) {
                                    attempts++;
                                    // Sample in 2D cross-section (r, theta) with theta in [0, pi]
                                    var r = Math.random() * rMax;
                                    var theta = Math.random() * Math.PI;
                                    var cosT = Math.cos(theta);
                                    var sinT = Math.sin(theta);

                                    var R = radialWF(n, l, r);
                                    var Y = angularFactor(l, ml, cosT);
                                    var psi = R * Y;
                                    var prob = psi * psi * r * r * sinT; // volume element weight

                                    // Normalize probability for rejection sampling
                                    var probMax = 0.15; // tuned per orbital
                                    if (n === 1) probMax = 0.4;
                                    else if (n === 2 && l === 0) probMax = 0.06;
                                    else if (n === 2 && l === 1) probMax = 0.025;
                                    else if (n === 3 && l === 0) probMax = 0.015;
                                    else if (n === 3 && l === 1) probMax = 0.008;
                                    else if (n === 3 && l === 2) probMax = 0.003;

                                    if (Math.random() < prob / probMax) {
                                        // Map to screen coordinates (xz plane cross-section)
                                        var px = r * sinT; // radial distance from z-axis
                                        var pz = r * cosT; // along z-axis

                                        // Random azimuthal angle for 3D look
                                        var phi = Math.random() * Math.PI * 2;
                                        var screenX = px * Math.cos(phi);
                                        var screenY = pz;

                                        // Scale to display
                                        var scale = cloudSize / (2 * rMax);
                                        cloudDots.push({
                                            x: cloudCx + screenX * scale,
                                            y: cloudCy - screenY * scale,
                                            phase: psi > 0 ? 1 : -1,
                                            r: r
                                        });
                                    }
                                }
                            }

                            generateCloud();

                            var time = 0;

                            function draw(now) {
                                time = now * 0.001;
                                viz.clear();

                                var orb = orbitals[currentOrbital];
                                var n = orb.n, l = orb.l;

                                // Title
                                viz.screenText(orb.name + ' orbital', cloudCx, 16, viz.colors.white, 14);
                                viz.screenText('n=' + n + ', l=' + l + ' (' + ['s','p','d','f'][l] + ')', cloudCx, 32, viz.colors.text, 11);

                                // Draw cloud boundary circle (faint)
                                ctx.strokeStyle = viz.colors.axis + '22';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.arc(cloudCx, cloudCy, cloudSize / 2, 0, Math.PI * 2);
                                ctx.stroke();

                                // Draw nucleus
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.arc(cloudCx, cloudCy, 3, 0, Math.PI * 2);
                                ctx.fill();

                                // Draw cloud dots with shimmer
                                for (var di = 0; di < cloudDots.length; di++) {
                                    var dot = cloudDots[di];
                                    var shimmer = 0.4 + 0.6 * Math.abs(Math.sin(time * 1.5 + di * 0.17));
                                    var alpha = shimmer * 0.75;
                                    if (dot.phase > 0) {
                                        ctx.fillStyle = 'rgba(88,166,255,' + alpha.toFixed(3) + ')';
                                    } else {
                                        ctx.fillStyle = 'rgba(240,136,62,' + alpha.toFixed(3) + ')';
                                    }
                                    ctx.beginPath();
                                    ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Axis labels
                                viz.screenText('z', cloudCx, cloudCy - cloudSize / 2 - 8, viz.colors.text, 10);
                                ctx.strokeStyle = viz.colors.axis + '44';
                                ctx.lineWidth = 0.5;
                                ctx.setLineDash([3, 3]);
                                // z axis
                                ctx.beginPath();
                                ctx.moveTo(cloudCx, cloudCy - cloudSize / 2);
                                ctx.lineTo(cloudCx, cloudCy + cloudSize / 2);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Phase legend
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(cloudCx - cloudSize / 2, h - 22, 10, 10);
                                viz.screenText('+', cloudCx - cloudSize / 2 + 18, h - 17, viz.colors.blue, 10, 'left');
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(cloudCx - cloudSize / 2 + 35, h - 22, 10, 10);
                                viz.screenText('-', cloudCx - cloudSize / 2 + 53, h - 17, viz.colors.orange, 10, 'left');

                                // === Radial Distribution Function P(r) = r^2 |R(r)|^2 ===
                                ctx.fillStyle = '#0a0a1a';
                                ctx.fillRect(rpL, rpT, rpW, rpH);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(rpL, rpT, rpW, rpH);

                                viz.screenText('P(r) = r\u00B2|R(r)|\u00B2', rpL + rpW / 2, rpT - 10, viz.colors.white, 11);
                                viz.screenText('r / a\u2080', rpL + rpW / 2, rpB + 16, viz.colors.text, 10);

                                var rMax = n * n * 3 + 5;
                                // Compute P(r) and find max
                                var prMax = 0;
                                var nSteps = 200;
                                for (var pi = 0; pi <= nSteps; pi++) {
                                    var rr = (pi / nSteps) * rMax;
                                    var Rval = radialWF(n, l, rr);
                                    var Pr = rr * rr * Rval * Rval;
                                    if (Pr > prMax) prMax = Pr;
                                }
                                if (prMax < 1e-10) prMax = 0.1;

                                // Plot P(r)
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var plotStarted = false;
                                for (var pi2 = 0; pi2 <= nSteps; pi2++) {
                                    var rr2 = (pi2 / nSteps) * rMax;
                                    var Rval2 = radialWF(n, l, rr2);
                                    var Pr2 = rr2 * rr2 * Rval2 * Rval2;
                                    var px2 = rpL + (pi2 / nSteps) * rpW;
                                    var py2 = rpB - (Pr2 / prMax) * (rpH - 15);
                                    if (!plotStarted) { ctx.moveTo(px2, py2); plotStarted = true; }
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();

                                // Fill under curve
                                ctx.lineTo(rpR, rpB);
                                ctx.lineTo(rpL, rpB);
                                ctx.closePath();
                                ctx.fillStyle = viz.colors.cyan + '15';
                                ctx.fill();

                                // r axis ticks
                                var tickStep = Math.max(1, Math.floor(rMax / 5));
                                for (var rt = 0; rt <= rMax; rt += tickStep) {
                                    var rtx = rpL + (rt / rMax) * rpW;
                                    ctx.strokeStyle = viz.colors.grid;
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(rtx, rpB);
                                    ctx.lineTo(rtx, rpB - 4);
                                    ctx.stroke();
                                    viz.screenText(rt.toString(), rtx, rpB + 6, viz.colors.text, 8);
                                }

                                // Mark expected radius for Bohr (n^2 a0)
                                var bohrR = n * n;
                                var bohrX = rpL + (bohrR / rMax) * rpW;
                                if (bohrX > rpL && bohrX < rpR) {
                                    ctx.strokeStyle = viz.colors.gold + '88';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath();
                                    ctx.moveTo(bohrX, rpT + 5);
                                    ctx.lineTo(bohrX, rpB);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('n\u00B2a\u2080', bohrX, rpT + 14, viz.colors.gold, 9);
                                }

                                // Orbital info
                                var infoY = rpB + 30;
                                var subshellCount = 2 * (2 * l + 1);
                                viz.screenText('Subshell ' + orb.name + ': ' + (2 * l + 1) + ' orbital(s), max ' + subshellCount + ' e\u207B', rpL + rpW / 2, infoY, viz.colors.text, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'For \\(n = 3\\), list all possible combinations of \\(l\\) and \\(m_l\\). How many orbitals are there in total?',
                        hint: 'For \\(n = 3\\): \\(l = 0, 1, 2\\). For each \\(l\\), \\(m_l\\) ranges from \\(-l\\) to \\(+l\\).',
                        solution: '\\(l = 0\\): \\(m_l = 0\\) (1 orbital, 3s). \\(l = 1\\): \\(m_l = -1, 0, +1\\) (3 orbitals, 3p). \\(l = 2\\): \\(m_l = -2, -1, 0, +1, +2\\) (5 orbitals, 3d). Total: \\(1 + 3 + 5 = 9\\) orbitals, holding up to \\(2 \\times 9 = 18\\) electrons.'
                    }
                ]
            },

            // ============================================================
            // Section 1: s/p/d/f Orbitals
            // ============================================================
            {
                id: 'orbital-shapes',
                title: 's/p/d/f Orbitals',
                content: `
<h2>Orbital Shapes</h2>

<p>The angular momentum quantum number \\(l\\) determines the shape of the electron's probability cloud. The letter designations come from historical spectroscopic terminology (sharp, principal, diffuse, fundamental).</p>

<h3>s Orbitals (\\(l = 0\\))</h3>

<p>Spherically symmetric. The probability depends only on the distance \\(r\\) from the nucleus, not on direction. The 1s orbital is a simple exponential decay; higher s orbitals (2s, 3s, ...) have spherical nodal surfaces (shells where \\(\\psi = 0\\)).</p>

<div class="env-block theorem">
<div class="env-title">Nodal Surfaces</div>
<div class="env-body">
<p>An orbital with quantum numbers \\((n, l)\\) has:</p>
<ul>
<li>\\(n - l - 1\\) radial nodes (spherical shells where \\(\\psi = 0\\))</li>
<li>\\(l\\) angular nodes (planes or cones where \\(\\psi = 0\\))</li>
<li>Total nodes: \\(n - 1\\)</li>
</ul>
</div>
</div>

<h3>p Orbitals (\\(l = 1\\))</h3>

<p>Dumbbell-shaped, with two lobes on opposite sides of the nucleus separated by a nodal plane through the nucleus. There are three p orbitals (\\(m_l = -1, 0, +1\\)), oriented along the x, y, and z axes. The two lobes have opposite sign of \\(\\psi\\) (opposite phase).</p>

<h3>d Orbitals (\\(l = 2\\))</h3>

<p>More complex shapes with four lobes (cloverleaf pattern) or a donut-plus-dumbbell shape. There are five d orbitals per subshell. These are crucial for transition metal chemistry and crystal field theory.</p>

<h3>f Orbitals (\\(l = 3\\))</h3>

<p>Even more complex, with seven orbitals per subshell. These are relevant for lanthanides and actinides. The shapes are elaborate, with multiple lobes and nodal surfaces.</p>

<div class="env-block remark">
<div class="env-title">Why orbital shapes matter</div>
<div class="env-body">
<p>The shape of an orbital determines how an electron in that orbital interacts with other atoms. Chemical bonds form when orbitals on different atoms overlap. The geometry of p orbitals explains why carbon forms bonds at 109.5-degree angles (sp\\(^3\\) hybridization). The directional nature of d orbitals explains the colors of transition metal compounds.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'How many radial nodes does the 3s orbital have? How many angular nodes? How many total?',
                        hint: 'Radial nodes = \\(n - l - 1\\). Angular nodes = \\(l\\). Total = \\(n - 1\\).',
                        solution: 'Radial nodes: \\(3 - 0 - 1 = 2\\). Angular nodes: \\(0\\). Total: \\(3 - 1 = 2\\). The 3s orbital has two concentric spherical shells where \\(\\psi = 0\\).'
                    },
                    {
                        question: 'How many radial nodes does the 3d orbital have?',
                        hint: 'Use \\(n - l - 1\\) with \\(n = 3\\), \\(l = 2\\).',
                        solution: 'Radial nodes: \\(3 - 2 - 1 = 0\\). The 3d orbital has no radial nodes but has 2 angular nodes, for a total of 2 nodes.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Electron Probability Clouds
            // ============================================================
            {
                id: 'probability-clouds',
                title: 'Electron Probability Clouds',
                content: `
<h2>What \\(|\\psi|^2\\) Tells Us</h2>

<p>The wave function \\(\\psi(r, \\theta, \\phi)\\) is a complex-valued function of position. Its physical meaning comes through Born's interpretation:</p>

<div class="env-block definition">
<div class="env-title">Definition: Probability Density</div>
<div class="env-body">
<p>\\(|\\psi(\\mathbf{r})|^2 \\, dV\\) is the probability of finding the electron in the small volume element \\(dV\\) centered at position \\(\\mathbf{r}\\). The total probability over all space is 1:</p>
\\[\\int |\\psi|^2 \\, dV = 1\\]
</div>
</div>

<h3>Probability Density vs. Radial Probability</h3>

<p>There is an important distinction:</p>

<ul>
<li><strong>Probability density</strong> \\(|\\psi|^2\\): probability per unit volume at a point. For s orbitals, this is maximum at the nucleus (\\(r = 0\\)).</li>
<li><strong>Radial probability distribution</strong> \\(P(r) = 4\\pi r^2 |\\psi|^2\\): probability per unit radius of finding the electron at distance \\(r\\). This has a maximum away from the nucleus because the \\(r^2\\) factor (representing the growing shell area) outweighs the decrease in \\(|\\psi|^2\\).</li>
</ul>

<div class="env-block warning">
<div class="env-title">A common misconception</div>
<div class="env-body">
<p>For the 1s orbital, \\(|\\psi|^2\\) is greatest at the nucleus, yet the electron is <em>most likely</em> to be found at \\(r = a_0\\) (the Bohr radius). There is no contradiction: the probability density is highest at \\(r = 0\\), but there is essentially zero volume there. At \\(r = a_0\\), the density is lower, but there is much more volume (a spherical shell of area \\(4\\pi a_0^2\\)), so the total probability of finding the electron at that distance is maximized.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: 1s Radial Probability Peak</div>
<div class="env-body">
<p>For the 1s orbital: \\(\\psi \\propto e^{-r/a_0}\\), so \\(|\\psi|^2 \\propto e^{-2r/a_0}\\).</p>
<p>The radial probability: \\(P(r) = 4\\pi r^2 |\\psi|^2 \\propto r^2 e^{-2r/a_0}\\).</p>
<p>Setting \\(dP/dr = 0\\): the maximum occurs at \\(r = a_0 = 0.529\\) angstrom, exactly the Bohr radius.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Bohr was not wrong, just incomplete</div>
<div class="env-body">
<p>It is remarkable that the most probable distance in the quantum 1s orbital equals the Bohr radius. Bohr's model got the right distance but the wrong picture: the electron is not orbiting at \\(r = a_0\\); it is spread out in a cloud whose probability peaks at \\(r = a_0\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'For the 1s orbital, calculate the probability of finding the electron within one Bohr radius of the nucleus. The result is \\(P(r < a_0) = 1 - 5e^{-2} \\approx 0.323\\).',
                        hint: 'Integrate \\(P(r) = (4/a_0^3) r^2 e^{-2r/a_0}\\) from 0 to \\(a_0\\). Use integration by parts or look up the result.',
                        solution: 'The integral evaluates to \\(1 - (1 + 2 + 2) e^{-2} = 1 - 5e^{-2} \\approx 1 - 0.677 = 0.323\\). About 32% of the time, the electron is within one Bohr radius of the nucleus. This means 68% of the time it is farther away than the Bohr radius.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Electron Configurations
            // ============================================================
            {
                id: 'electron-configurations',
                title: 'Electron Configurations',
                content: `
<h2>Building Up Atoms</h2>

<p>For multi-electron atoms, we fill orbitals according to three rules:</p>

<div class="env-block theorem">
<div class="env-title">Rules for Electron Configuration</div>
<div class="env-body">
<ol>
<li><strong>Aufbau principle</strong>: Electrons fill orbitals from lowest energy to highest.</li>
<li><strong>Pauli exclusion principle</strong>: No two electrons in an atom can have the same set of four quantum numbers. Each orbital holds at most 2 electrons (with opposite spins).</li>
<li><strong>Hund's rule</strong>: When filling degenerate orbitals (same energy, e.g., the three 2p orbitals), electrons occupy them singly first, all with the same spin, before pairing up.</li>
</ol>
</div>
</div>

<h3>The Aufbau Order</h3>

<p>Due to electron-electron repulsion in multi-electron atoms, the energy depends on both \\(n\\) and \\(l\\) (unlike hydrogen, where it depends only on \\(n\\)). The filling order is:</p>

<p style="text-align:center;font-family:monospace;font-size:1.05em;">
1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p
</p>

<p>Notice that 4s fills before 3d, and 5s before 4d. A useful mnemonic is the diagonal rule: write subshells in rows by \\(n\\), then read along the diagonals.</p>

<div class="env-block example">
<div class="env-title">Example: First 18 Elements</div>
<div class="env-body">
<table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.92em;">
<tr style="border-bottom:1px solid #30363d;">
<th style="padding:4px 8px;">Z</th><th style="padding:4px 8px;">Element</th><th style="padding:4px 8px;">Configuration</th>
</tr>
<tr><td style="padding:3px 8px;">1</td><td>H</td><td style="font-family:monospace;">1s<sup>1</sup></td></tr>
<tr><td style="padding:3px 8px;">2</td><td>He</td><td style="font-family:monospace;">1s<sup>2</sup></td></tr>
<tr><td style="padding:3px 8px;">3</td><td>Li</td><td style="font-family:monospace;">1s<sup>2</sup> 2s<sup>1</sup></td></tr>
<tr><td style="padding:3px 8px;">6</td><td>C</td><td style="font-family:monospace;">1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>2</sup></td></tr>
<tr><td style="padding:3px 8px;">10</td><td>Ne</td><td style="font-family:monospace;">1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup></td></tr>
<tr><td style="padding:3px 8px;">11</td><td>Na</td><td style="font-family:monospace;">[Ne] 3s<sup>1</sup></td></tr>
<tr><td style="padding:3px 8px;">18</td><td>Ar</td><td style="font-family:monospace;">[Ne] 3s<sup>2</sup> 3p<sup>6</sup></td></tr>
</table>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Exceptions</div>
<div class="env-body">
<p>Some elements have configurations that deviate from the simple aufbau prediction. For example, chromium is [Ar] 3d<sup>5</sup> 4s<sup>1</sup> (not 3d<sup>4</sup> 4s<sup>2</sup>) and copper is [Ar] 3d<sup>10</sup> 4s<sup>1</sup> (not 3d<sup>9</sup> 4s<sup>2</sup>). Half-filled and fully filled d subshells have extra stability.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Write the electron configuration of iron (Fe, \\(Z = 26\\)).',
                        hint: 'Follow the aufbau order. After filling through [Ar] (18 electrons), you need 8 more electrons.',
                        solution: '[Ar] 3d<sup>6</sup> 4s<sup>2</sup>, or explicitly: 1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2</sup> 3d<sup>6</sup>. Iron has 6 electrons in the 3d subshell.'
                    },
                    {
                        question: 'Using Hund\'s rule, how many unpaired electrons does nitrogen (\\(Z = 7\\)) have?',
                        hint: 'Nitrogen has configuration 1s\\(^2\\) 2s\\(^2\\) 2p\\(^3\\). How do 3 electrons distribute among 3 degenerate 2p orbitals?',
                        solution: 'By Hund\'s rule, the three 2p electrons each occupy a different 2p orbital with parallel spins. All three are unpaired. Nitrogen has 3 unpaired electrons, which explains its paramagnetism.'
                    }
                ]
            },

            // ============================================================
            // Section 4: The Periodic Table Connection
            // ============================================================
            {
                id: 'periodic-table',
                title: 'The Periodic Table Connection',
                content: `
<h2>Quantum Mechanics Explains the Periodic Table</h2>

<p>Mendeleev organized elements by atomic mass and noticed recurring chemical properties (periodicity) without knowing why. Quantum mechanics provides the explanation: the periodic table is a map of electron configurations.</p>

<div class="env-block theorem">
<div class="env-title">Periodic Table Structure from Quantum Numbers</div>
<div class="env-body">
<ul>
<li><strong>Rows (periods)</strong>: Each row corresponds to filling a new principal shell \\(n\\). Period 1 fills \\(n = 1\\) (2 elements). Period 2 fills \\(n = 2\\) (8 elements). Period 3 fills \\(n = 3\\) s and p (8 elements).</li>
<li><strong>Columns (groups)</strong>: Elements in the same column have the same valence electron configuration. Group 1 (alkali metals): one s electron. Group 17 (halogens): five p electrons short of a full shell. Group 18 (noble gases): full outer shell.</li>
<li><strong>Blocks</strong>: s-block (groups 1-2), p-block (groups 13-18), d-block (transition metals, groups 3-12), f-block (lanthanides and actinides).</li>
</ul>
</div>
</div>

<h3>Why the Periods Have These Lengths</h3>

<p>The period lengths follow directly from the orbital capacities:</p>
<ul>
<li>Period 1: 1s only, capacity 2. Length: 2.</li>
<li>Periods 2, 3: s + p, capacity 2 + 6 = 8. Length: 8 each.</li>
<li>Periods 4, 5: s + d + p, capacity 2 + 10 + 6 = 18. Length: 18 each.</li>
<li>Periods 6, 7: s + f + d + p, capacity 2 + 14 + 10 + 6 = 32. Length: 32 each.</li>
</ul>

<p>The sequence 2, 8, 8, 18, 18, 32, 32 is not arbitrary; it is a direct consequence of the allowed quantum numbers.</p>

<div class="env-block intuition">
<div class="env-title">Why chemistry is what it is</div>
<div class="env-body">
<p>Chemical properties are determined by the outermost (valence) electrons. Elements in the same column have the same valence configuration, so they behave similarly. Sodium (3s\\(^1\\)) and potassium (4s\\(^1\\)) are both soft, reactive metals because they both have one loosely held s electron. Fluorine (2p\\(^5\\)) and chlorine (3p\\(^5\\)) are both aggressive oxidizers because they both need one electron to complete a p subshell. The periodic table is quantum mechanics made visible.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Noble Gas Stability</div>
<div class="env-body">
<p>Noble gases (He, Ne, Ar, Kr, Xe) have completely filled outer shells:</p>
<ul>
<li>He: 1s\\(^2\\) (full \\(n = 1\\) shell)</li>
<li>Ne: [He] 2s\\(^2\\) 2p\\(^6\\) (full \\(n = 2\\) shell)</li>
<li>Ar: [Ne] 3s\\(^2\\) 3p\\(^6\\) (full 3s + 3p subshells)</li>
</ul>
<p>A completely filled subshell is energetically stable; there is no tendency to gain or lose electrons. This is why noble gases are chemically inert (with rare exceptions involving very heavy noble gases and extremely electronegative partners).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The deep reason</div>
<div class="env-body">
<p>The existence of only certain orbital shapes (s, p, d, f), the restriction \\(l < n\\), the \\(2l + 1\\) orientations, and the spin-1/2 of the electron together produce the exact structure of the periodic table. If the electron had spin-1 instead of spin-1/2, each orbital would hold 3 electrons, and the periodic table would look completely different. If angular momentum were not quantized, there would be no discrete orbital shapes and no periodicity at all. The periodic table is, in a real sense, a consequence of quantum mechanics.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If the electron had spin quantum number \\(m_s = -1, 0, +1\\) (spin-1 instead of spin-1/2), how many electrons could fit in the \\(n = 2\\) shell?',
                        hint: 'Each orbital would hold 3 electrons instead of 2. Count the orbitals in \\(n = 2\\).',
                        solution: 'The \\(n = 2\\) shell has 4 orbitals (one 2s + three 2p). With 3 electrons per orbital: \\(4 \\times 3 = 12\\) electrons. The first noble gas would be at \\(Z = 3\\) (filling 1s with 3 electrons), and the second at \\(Z = 3 + 12 = 15\\). The periodic table would be radically different.'
                    },
                    {
                        question: 'Explain why elements in Group 1 (Li, Na, K, Rb, Cs) all have similar chemical properties.',
                        hint: 'What do their electron configurations have in common?',
                        solution: 'Each Group 1 element has a single electron in its outermost s orbital: Li is [He]2s\\(^1\\), Na is [Ne]3s\\(^1\\), K is [Ar]4s\\(^1\\), etc. This single, loosely bound valence electron is easily lost, making them all highly reactive metals that form +1 ions and react vigorously with water. Their chemical similarity is a direct consequence of having the same valence electron configuration.'
                    }
                ]
            }
        ]
    });
})();
