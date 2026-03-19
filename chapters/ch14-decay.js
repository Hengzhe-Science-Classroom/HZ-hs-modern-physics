// === Chapter 14: Radioactive Decay ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch14',
        number: 14,
        title: 'Radioactive Decay',
        subtitle: 'Alpha, beta, gamma, and the relentless ticking of the nuclear clock',
        file: 'ch14-decay',

        sections: [
            // ============================================================
            // Section 0: Alpha Decay
            // ============================================================
            {
                id: 'alpha-decay',
                title: 'Alpha Decay',
                content: `
<h2>Ejecting a Helium Nucleus</h2>

<p>In alpha decay, a heavy, unstable nucleus ejects an <strong>alpha particle</strong>: a tightly bound cluster of 2 protons and 2 neutrons (a helium-4 nucleus). This is the most common decay mode for nuclei heavier than lead.</p>

<div class="env-block definition">
<div class="env-title">Definition: Alpha Decay</div>
<div class="env-body">
<p>In <strong>alpha decay</strong>, a parent nucleus \\({}^A_Z X\\) emits an alpha particle \\({}^4_2\\text{He}\\) and transforms into a daughter nucleus:</p>
\\[{}^A_Z X \\rightarrow {}^{A-4}_{Z-2} Y + {}^4_2\\text{He}\\]
<p>The mass number decreases by 4 and the atomic number decreases by 2. The element changes.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-alpha-decay"></div>

<div class="env-block example">
<div class="env-title">Example: Uranium-238 alpha decay</div>
<div class="env-body">
\\[{}^{238}_{92}\\text{U} \\rightarrow {}^{234}_{90}\\text{Th} + {}^4_2\\text{He}\\]
<p>Uranium-238 decays to thorium-234 plus an alpha particle. The alpha particle carries away about 4.2 MeV of kinetic energy.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why helium-4?</div>
<div class="env-body">
<p>The alpha particle is exceptionally stable (high binding energy per nucleon: 7.1 MeV). Ejecting a pre-formed cluster of 4 nucleons is energetically much more favorable than ejecting individual protons or neutrons. The alpha particle essentially "crystallizes" inside the nucleus before tunneling through the Coulomb barrier and escaping.</p>
</div>
</div>

<p>Alpha particles are stopped by a sheet of paper or a few centimeters of air. They are heavily ionizing but have very low penetrating power. They are dangerous only if an alpha-emitting substance is inhaled or ingested.</p>
`,
                visualizations: [
                    {
                        id: 'viz-alpha-decay',
                        title: 'Alpha Decay Animation',
                        description: 'Watch a nucleus eject an alpha particle (2 protons + 2 neutrons). The alpha particle flies out with a glowing trail while the daughter nucleus recoils. Click "Decay!" to trigger the event.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var state = 'ready'; // 'ready', 'decaying', 'done'
                            var decayT = 0;
                            var parentX = w * 0.35, parentY = h * 0.45;

                            // Parent nucleus: cluster of nucleons
                            var parentNucleons = [];
                            var nR = 8;
                            var parentR = 38;
                            for (var i = 0; i < 20; i++) {
                                var angle = Math.random() * Math.PI * 2;
                                var dist = Math.random() * parentR * 0.8;
                                parentNucleons.push({
                                    type: Math.random() < 0.42 ? 'p' : 'n', // ~42% protons for heavy nucleus
                                    ox: Math.cos(angle) * dist,
                                    oy: Math.sin(angle) * dist,
                                    phase: Math.random() * Math.PI * 2,
                                    freq: 1 + Math.random() * 2
                                });
                            }
                            // Mark 4 nucleons as alpha (2p + 2n) on the right side
                            var alphaIdx = [];
                            var pCount = 0, nCount = 0;
                            for (var i = parentNucleons.length - 1; i >= 0 && alphaIdx.length < 4; i--) {
                                if (parentNucleons[i].type === 'p' && pCount < 2) { alphaIdx.push(i); pCount++; }
                                else if (parentNucleons[i].type === 'n' && nCount < 2) { alphaIdx.push(i); nCount++; }
                            }

                            // Alpha particle state
                            var alphaX = 0, alphaY = 0, alphaVx = 0, alphaVy = 0;
                            var alphaTrail = [];
                            var recoilVx = 0, recoilX = 0;

                            // Flash
                            var flashAlpha = 0;

                            VizEngine.createButton(controls, 'Decay!', function () {
                                if (state !== 'decaying') {
                                    state = 'decaying';
                                    decayT = 0;
                                    alphaX = parentX + parentR * 0.5;
                                    alphaY = parentY;
                                    alphaVx = 3.5;
                                    alphaVy = -0.3;
                                    alphaTrail = [];
                                    recoilVx = -0.15;
                                    recoilX = 0;
                                    flashAlpha = 1.0;
                                }
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                state = 'ready';
                                decayT = 0;
                                alphaTrail = [];
                                recoilX = 0;
                                flashAlpha = 0;
                            });

                            function draw(now) {
                                viz.clear();
                                var t = now / 1000;

                                if (state === 'decaying') {
                                    decayT++;
                                    alphaX += alphaVx;
                                    alphaY += alphaVy;
                                    recoilX += recoilVx;
                                    alphaTrail.push([alphaX, alphaY]);
                                    if (alphaTrail.length > 80) alphaTrail.shift();
                                    flashAlpha *= 0.95;
                                    if (alphaX > w + 50) state = 'done';
                                }

                                var showAlpha = (state === 'decaying' || state === 'done');
                                var pX = parentX + recoilX;

                                // Flash effect
                                if (flashAlpha > 0.01) {
                                    ctx.save();
                                    ctx.globalAlpha = flashAlpha * 0.4;
                                    var grad = ctx.createRadialGradient(parentX, parentY, 0, parentX, parentY, 120);
                                    grad.addColorStop(0, '#ffffff');
                                    grad.addColorStop(0.5, viz.colors.gold);
                                    grad.addColorStop(1, 'transparent');
                                    ctx.fillStyle = grad;
                                    ctx.beginPath(); ctx.arc(parentX, parentY, 120, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }

                                // Draw parent/daughter nucleus
                                for (var i = 0; i < parentNucleons.length; i++) {
                                    if (showAlpha && alphaIdx.indexOf(i) >= 0) continue;
                                    var pn = parentNucleons[i];
                                    var jx = Math.sin(t * pn.freq + pn.phase) * 1.2;
                                    var jy = Math.cos(t * pn.freq * 1.1 + pn.phase) * 1.2;
                                    var nx = pX + pn.ox + jx;
                                    var ny = parentY + pn.oy + jy;
                                    var col = pn.type === 'p' ? viz.colors.red : viz.colors.blue;
                                    ctx.save();
                                    ctx.shadowColor = col; ctx.shadowBlur = 8;
                                    ctx.fillStyle = col;
                                    ctx.beginPath(); ctx.arc(nx, ny, nR, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = 'rgba(255,255,255,0.2)';
                                    ctx.beginPath(); ctx.arc(nx - 2, ny - 2, nR * 0.3, 0, Math.PI * 2); ctx.fill();
                                }

                                // Label parent/daughter
                                if (!showAlpha) {
                                    viz.screenText('Parent Nucleus', pX, parentY + parentR + 25, viz.colors.gold, 12);
                                    viz.screenText('(unstable)', pX, parentY + parentR + 42, viz.colors.text, 10);
                                } else {
                                    viz.screenText('Daughter Nucleus', pX, parentY + parentR + 25, viz.colors.teal, 12);
                                    viz.screenText('(Z\u22122, A\u22124)', pX, parentY + parentR + 42, viz.colors.text, 10);
                                }

                                // Draw alpha particle trail and particle
                                if (showAlpha && alphaTrail.length > 1) {
                                    for (var i = 1; i < alphaTrail.length; i++) {
                                        var alpha = (i / alphaTrail.length) * 0.6;
                                        ctx.strokeStyle = viz.colors.gold;
                                        ctx.globalAlpha = alpha;
                                        ctx.lineWidth = 2 + (i / alphaTrail.length) * 2;
                                        ctx.beginPath();
                                        ctx.moveTo(alphaTrail[i - 1][0], alphaTrail[i - 1][1]);
                                        ctx.lineTo(alphaTrail[i][0], alphaTrail[i][1]);
                                        ctx.stroke();
                                    }
                                    ctx.globalAlpha = 1;
                                }

                                if (state === 'decaying') {
                                    // Draw alpha particle (4 nucleons in tight cluster)
                                    var aOff = [[-6, -6], [6, -6], [-6, 6], [6, 6]];
                                    var aTypes = ['p', 'n', 'n', 'p'];
                                    for (var i = 0; i < 4; i++) {
                                        var col = aTypes[i] === 'p' ? viz.colors.red : viz.colors.blue;
                                        ctx.save();
                                        ctx.shadowColor = viz.colors.gold; ctx.shadowBlur = 12;
                                        ctx.fillStyle = col;
                                        ctx.beginPath();
                                        ctx.arc(alphaX + aOff[i][0], alphaY + aOff[i][1], nR * 0.85, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                    viz.screenText('\u03B1', alphaX, alphaY - 20, viz.colors.gold, 14);
                                    viz.screenText('(2p + 2n)', alphaX, alphaY + 22, viz.colors.gold, 9);
                                }

                                // Equation
                                viz.screenText('\u00B2\u00B3\u2078U  \u2192  \u00B2\u00B3\u2074Th + \u2074He (\u03B1)', w / 2, h - 25, viz.colors.white, 13);

                                // Title
                                viz.screenText('Alpha Decay', w / 2, 18, viz.colors.gold, 16);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Radium-226 undergoes alpha decay. Write the nuclear equation and identify the daughter nucleus.',
                        hint: 'Radium has \\(Z = 88\\). Subtract 2 from \\(Z\\) and 4 from \\(A\\).',
                        solution: '\\({}^{226}_{88}\\text{Ra} \\rightarrow {}^{222}_{86}\\text{Rn} + {}^4_2\\text{He}\\). The daughter is radon-222 (\\(Z = 86\\)), a radioactive noble gas.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Beta Decay
            // ============================================================
            {
                id: 'beta-decay',
                title: 'Beta Decay',
                content: `
<h2>Transmuting Neutrons and Protons</h2>

<p>In beta decay, a neutron inside the nucleus converts into a proton (or vice versa), emitting a fast electron or positron. Unlike alpha decay, beta decay changes the element by one unit of atomic number without significantly changing the mass number.</p>

<div class="env-block definition">
<div class="env-title">Definition: Beta Decay</div>
<div class="env-body">
<p><strong>Beta-minus (\\(\\beta^-\\)) decay</strong>: A neutron converts to a proton, emitting an electron and an antineutrino:</p>
\\[n \\rightarrow p + e^- + \\bar{\\nu}_e\\]
\\[{}^A_Z X \\rightarrow {}^A_{Z+1} Y + e^- + \\bar{\\nu}_e\\]
<p><strong>Beta-plus (\\(\\beta^+\\)) decay</strong>: A proton converts to a neutron, emitting a positron and a neutrino:</p>
\\[p \\rightarrow n + e^+ + \\nu_e\\]
\\[{}^A_Z X \\rightarrow {}^A_{Z-1} Y + e^+ + \\nu_e\\]
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The neutrino puzzle</div>
<div class="env-body">
<p>When beta decay was first studied, the emitted electron did not carry away all the expected energy; the energy spectrum was continuous, not discrete. This seemed to violate energy conservation. In 1930, Wolfgang Pauli proposed that an unseen, nearly massless neutral particle (the neutrino) carried away the missing energy. It was not directly detected until 1956.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Carbon-14 beta decay</div>
<div class="env-body">
\\[{}^{14}_6\\text{C} \\rightarrow {}^{14}_7\\text{N} + e^- + \\bar{\\nu}_e\\]
<p>Carbon-14 has too many neutrons for stability. A neutron converts to a proton, changing carbon to nitrogen. This is the decay that makes radiocarbon dating possible.</p>
</div>
</div>

<p>Beta particles (electrons or positrons) are more penetrating than alpha particles. They can pass through paper but are stopped by a few millimeters of aluminum. The emitted neutrino passes through almost all matter without interacting.</p>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Cobalt-60 (\\(Z = 27\\)) undergoes \\(\\beta^-\\) decay. What is the daughter nucleus?',
                        hint: 'In \\(\\beta^-\\) decay, \\(Z\\) increases by 1 while \\(A\\) stays the same.',
                        solution: '\\({}^{60}_{27}\\text{Co} \\rightarrow {}^{60}_{28}\\text{Ni} + e^- + \\bar{\\nu}_e\\). The daughter is nickel-60.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Gamma Decay
            // ============================================================
            {
                id: 'gamma-decay',
                title: 'Gamma Decay',
                content: `
<h2>The Nucleus Releases a Photon</h2>

<p>After an alpha or beta decay, the daughter nucleus is often left in an <strong>excited state</strong>: it has excess energy but the "right" numbers of protons and neutrons. The nucleus drops to a lower energy state by emitting a high-energy photon called a <strong>gamma ray</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Gamma Decay</div>
<div class="env-body">
<p>In <strong>gamma decay</strong>, an excited nucleus emits a gamma-ray photon (\\(\\gamma\\)) without changing its composition:</p>
\\[{}^A_Z X^* \\rightarrow {}^A_Z X + \\gamma\\]
<p>The asterisk (*) denotes the excited state. Neither \\(Z\\) nor \\(A\\) changes. The gamma ray typically has energy from tens of keV to several MeV.</p>
</div>
</div>

<p>Gamma rays are the most penetrating form of nuclear radiation. They can pass through the human body and require dense shielding (lead or thick concrete) to absorb. They are electromagnetic radiation, like visible light or X-rays, but with much higher energy and shorter wavelength (\\(\\lambda < 10^{-12}\\,\\text{m}\\)).</p>

<div class="env-block remark">
<div class="env-title">Comparison of the three radiation types</div>
<div class="env-body">
<table>
<tr><th>Type</th><th>Particle</th><th>Charge</th><th>Stopped by</th><th>Ionizing power</th></tr>
<tr><td>Alpha (\\(\\alpha\\))</td><td>\\({}^4_2\\text{He}\\)</td><td>+2e</td><td>Paper, skin</td><td>High</td></tr>
<tr><td>Beta (\\(\\beta\\))</td><td>\\(e^-\\) or \\(e^+\\)</td><td>\\(\\pm e\\)</td><td>Aluminum</td><td>Medium</td></tr>
<tr><td>Gamma (\\(\\gamma\\))</td><td>Photon</td><td>0</td><td>Lead, concrete</td><td>Low</td></tr>
</table>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Radiation safety</div>
<div class="env-body">
<p>High ionizing power means more damage to biological tissue per particle, but low penetrating power means external sources are less dangerous (alpha emitters are harmful mainly if inhaled or ingested). Gamma rays have low ionizing power per photon but are difficult to shield against, making external gamma sources the primary concern for radiation protection.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A nucleus undergoes beta-minus decay, and the daughter is left in an excited state. It then emits a gamma ray. Write the full decay chain for cobalt-60 decaying to nickel-60.',
                        hint: 'First write the beta decay, then the gamma emission from the excited daughter.',
                        solution: '\\({}^{60}_{27}\\text{Co} \\rightarrow {}^{60}_{28}\\text{Ni}^* + e^- + \\bar{\\nu}_e\\), then \\({}^{60}_{28}\\text{Ni}^* \\rightarrow {}^{60}_{28}\\text{Ni} + \\gamma\\). In practice, nickel-60 emits two gamma photons (1.17 MeV and 1.33 MeV) as it de-excites through intermediate states.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Half-Life
            // ============================================================
            {
                id: 'half-life',
                title: 'Half-Life',
                content: `
<h2>The Nuclear Clock</h2>

<p>Radioactive decay is a random process. You cannot predict when any individual nucleus will decay. But with a large number of identical nuclei, the statistical behavior is perfectly predictable: the <strong>half-life</strong> governs the rate.</p>

<div class="env-block definition">
<div class="env-title">Definition: Half-Life</div>
<div class="env-body">
<p>The <strong>half-life</strong> \\(t_{1/2}\\) is the time required for half of the nuclei in a sample to decay. After one half-life, \\(N_0/2\\) nuclei remain. After two half-lives, \\(N_0/4\\). After \\(n\\) half-lives:</p>
\\[N(t) = N_0 \\left(\\frac{1}{2}\\right)^{t/t_{1/2}} = N_0 \\, e^{-\\lambda t}\\]
<p>where \\(\\lambda = \\ln 2 / t_{1/2}\\) is the <strong>decay constant</strong>.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-half-life"></div>

<p>Half-lives span an extraordinary range:</p>
<ul>
<li>Polonium-214: \\(t_{1/2} = 164\\,\\mu\\text{s}\\) (microseconds)</li>
<li>Radon-222: \\(t_{1/2} = 3.8\\,\\text{days}\\)</li>
<li>Carbon-14: \\(t_{1/2} = 5730\\,\\text{years}\\)</li>
<li>Uranium-238: \\(t_{1/2} = 4.47 \\times 10^9\\,\\text{years}\\) (comparable to the age of Earth)</li>
</ul>

<div class="env-block theorem">
<div class="env-title">Exponential Decay Law</div>
<div class="env-body">
<p>The number of undecayed nuclei follows:</p>
\\[N(t) = N_0 \\, e^{-\\lambda t}\\]
<p>The <strong>activity</strong> (number of decays per second) is:</p>
\\[A(t) = \\lambda N(t) = A_0 \\, e^{-\\lambda t}\\]
<p>Activity is measured in becquerels (Bq): 1 Bq = 1 decay per second.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: How much remains?</div>
<div class="env-body">
<p>A sample contains \\(10^6\\) atoms of a radioactive isotope with \\(t_{1/2} = 2\\,\\text{hours}\\). How many atoms remain after 6 hours?</p>
\\[N = 10^6 \\times \\left(\\frac{1}{2}\\right)^{6/2} = 10^6 \\times \\left(\\frac{1}{2}\\right)^3 = 10^6 \\times \\frac{1}{8} = 125{,}000\\]
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-half-life',
                        title: 'Half-Life Simulator',
                        description: 'Watch radioactive atoms (green = undecayed, gray = decayed) randomly decay over time. The curve \\(N(t) = N_0 (1/2)^{t/t_{1/2}}\\) appears on the right. Adjust the half-life to see the difference between fast and slow decays.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var N0 = 200;
                            var halfLife = 3.0; // seconds
                            var lambda = Math.log(2) / halfLife;
                            var atoms = [];
                            var running = false;
                            var simTime = 0;
                            var history = [];
                            var maxHistTime = 20;
                            var lastFrame = 0;

                            // Grid of atoms (left panel)
                            var gridL = 20, gridT = 30, gridCols = 16, gridRows = Math.ceil(N0 / 16);
                            var cellSize = Math.min((w * 0.42 - gridL) / gridCols, (h - 60) / gridRows);
                            if (cellSize < 8) cellSize = 8;

                            function initAtoms() {
                                atoms = [];
                                for (var i = 0; i < N0; i++) {
                                    atoms.push({ decayed: false, decayTime: -1 });
                                }
                                simTime = 0;
                                history = [{ t: 0, n: N0 }];
                            }
                            initAtoms();

                            VizEngine.createSlider(controls, 'Half-life (s)', 0.5, 8.0, halfLife, 0.5, function (v) {
                                halfLife = v;
                                lambda = Math.log(2) / halfLife;
                            });

                            VizEngine.createButton(controls, 'Start', function () {
                                if (!running) {
                                    running = true;
                                    lastFrame = performance.now();
                                }
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                running = false;
                                initAtoms();
                            });

                            // Graph area
                            var gL = w * 0.50, gR = w - 25, gT = 35, gB = h - 35;
                            var gW = gR - gL, gH = gB - gT;

                            function draw(now) {
                                var dt = running ? Math.min((now - lastFrame) / 1000, 0.05) : 0;
                                lastFrame = now;

                                if (running && dt > 0) {
                                    simTime += dt;
                                    // For each undecayed atom, check if it decays this frame
                                    var undecayed = 0;
                                    for (var i = 0; i < N0; i++) {
                                        if (!atoms[i].decayed) {
                                            // Probability of decaying in dt: 1 - e^(-lambda*dt)
                                            if (Math.random() < 1 - Math.exp(-lambda * dt)) {
                                                atoms[i].decayed = true;
                                                atoms[i].decayTime = simTime;
                                            } else {
                                                undecayed++;
                                            }
                                        }
                                    }
                                    history.push({ t: simTime, n: undecayed });
                                    if (history.length > 1000) history = history.filter(function (_, idx) { return idx % 2 === 0; });
                                }

                                viz.clear();

                                // Count undecayed
                                var alive = 0;
                                for (var i = 0; i < N0; i++) {
                                    if (!atoms[i].decayed) alive++;
                                }

                                // Draw atom grid
                                for (var i = 0; i < N0; i++) {
                                    var row = Math.floor(i / gridCols);
                                    var col = i % gridCols;
                                    var ax = gridL + col * cellSize + cellSize / 2;
                                    var ay = gridT + row * cellSize + cellSize / 2;
                                    var r = cellSize * 0.35;

                                    if (atoms[i].decayed) {
                                        // Fading effect shortly after decay
                                        var dt2 = simTime - atoms[i].decayTime;
                                        var fade = dt2 < 0.5 ? 1 - dt2 * 2 : 0;
                                        if (fade > 0) {
                                            ctx.save();
                                            ctx.globalAlpha = fade * 0.5;
                                            ctx.fillStyle = viz.colors.orange;
                                            ctx.beginPath(); ctx.arc(ax, ay, r * 1.5, 0, Math.PI * 2); ctx.fill();
                                            ctx.restore();
                                        }
                                        ctx.fillStyle = '#2a2a4a';
                                        ctx.beginPath(); ctx.arc(ax, ay, r, 0, Math.PI * 2); ctx.fill();
                                    } else {
                                        ctx.save();
                                        ctx.shadowColor = viz.colors.green; ctx.shadowBlur = 4;
                                        ctx.fillStyle = viz.colors.green;
                                        ctx.beginPath(); ctx.arc(ax, ay, r, 0, Math.PI * 2); ctx.fill();
                                        ctx.restore();
                                    }
                                }

                                // Atom count
                                viz.screenText('Remaining: ' + alive + '/' + N0, gridL + gridCols * cellSize / 2, h - 12, viz.colors.green, 12);

                                // Graph
                                ctx.fillStyle = 'rgba(12,12,32,0.8)';
                                ctx.fillRect(gL - 5, gT - 20, gW + 30, gH + 45);

                                // Axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gR, gB); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(gL, gT); ctx.lineTo(gL, gB); ctx.stroke();

                                viz.screenText('t (s)', gR + 5, gB + 2, viz.colors.text, 10, 'left', 'top');
                                viz.screenText('N(t)', gL - 3, gT - 8, viz.colors.text, 10, 'center');

                                // Time ticks
                                var tMax = Math.max(maxHistTime, simTime * 1.1, halfLife * 5);
                                for (var tt = 0; tt <= tMax; tt += Math.ceil(tMax / 5)) {
                                    if (tt === 0) continue;
                                    var tx = gL + (tt / tMax) * gW;
                                    if (tx > gR) break;
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(tx, gT); ctx.lineTo(tx, gB); ctx.stroke();
                                    viz.screenText(tt.toFixed(0), tx, gB + 10, viz.colors.text, 9);
                                }

                                // N ticks
                                for (var nn = 0; nn <= N0; nn += 50) {
                                    var ny = gB - (nn / N0) * gH;
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(gL, ny); ctx.lineTo(gR, ny); ctx.stroke();
                                    viz.screenText(nn.toString(), gL - 15, ny, viz.colors.text, 9);
                                }

                                // Theoretical curve
                                ctx.strokeStyle = viz.colors.cyan + '88'; ctx.lineWidth = 1.5;
                                ctx.setLineDash([5, 3]);
                                ctx.beginPath();
                                for (var tt = 0; tt <= tMax; tt += tMax / 200) {
                                    var nTheory = N0 * Math.exp(-lambda * tt);
                                    var tx = gL + (tt / tMax) * gW;
                                    var ty = gB - (nTheory / N0) * gH;
                                    if (tt === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Half-life marker
                                var hlx = gL + (halfLife / tMax) * gW;
                                var hly = gB - 0.5 * gH;
                                if (hlx < gR) {
                                    ctx.setLineDash([3, 3]);
                                    ctx.strokeStyle = viz.colors.yellow + '66'; ctx.lineWidth = 1;
                                    ctx.beginPath(); ctx.moveTo(hlx, gT); ctx.lineTo(hlx, gB); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(gL, hly); ctx.lineTo(gR, hly); ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('t\u00BD', hlx, gB + 10, viz.colors.yellow, 9);
                                    viz.screenText('N\u2080/2', gL - 18, hly, viz.colors.yellow, 8);
                                }

                                // Actual data points
                                if (history.length > 1) {
                                    ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    for (var hi = 0; hi < history.length; hi++) {
                                        var hx = gL + (history[hi].t / tMax) * gW;
                                        var hy = gB - (history[hi].n / N0) * gH;
                                        if (hi === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
                                    }
                                    ctx.stroke();
                                }

                                // Time display
                                viz.screenText('t = ' + simTime.toFixed(1) + ' s', gL + gW / 2, gT - 8, viz.colors.white, 11);

                                // Legend
                                ctx.setLineDash([5, 3]);
                                ctx.strokeStyle = viz.colors.cyan; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(gL + 10, gT + 8); ctx.lineTo(gL + 30, gT + 8); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('theory', gL + 55, gT + 8, viz.colors.cyan, 9, 'left');

                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(gL + 85, gT + 8); ctx.lineTo(gL + 105, gT + 8); ctx.stroke();
                                viz.screenText('observed', gL + 130, gT + 8, viz.colors.green, 9, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A radioactive sample has an initial activity of 800 Bq and a half-life of 4 hours. What is its activity after 12 hours?',
                        hint: 'Activity follows the same exponential law as the number of atoms. 12 hours = 3 half-lives.',
                        solution: 'After 3 half-lives: \\(A = 800 \\times (1/2)^3 = 800/8 = 100\\,\\text{Bq}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Carbon Dating
            // ============================================================
            {
                id: 'carbon-dating',
                title: 'Carbon Dating',
                content: `
<h2>Reading the Clock in Dead Things</h2>

<p>Radiocarbon dating, developed by Willard Libby in 1949 (Nobel Prize 1960), uses the decay of carbon-14 to determine the age of organic materials up to about 50,000 years old.</p>

<div class="env-block definition">
<div class="env-title">Definition: Radiocarbon Dating</div>
<div class="env-body">
<p>While an organism is alive, it continuously exchanges carbon with the environment, maintaining a constant ratio of \\({}^{14}\\text{C}\\) to \\({}^{12}\\text{C}\\). When the organism dies, the exchange stops and the \\({}^{14}\\text{C}\\) decays with \\(t_{1/2} = 5730\\) years:</p>
\\[{}^{14}_6\\text{C} \\rightarrow {}^{14}_7\\text{N} + e^- + \\bar{\\nu}_e\\]
<p>By measuring the remaining \\({}^{14}\\text{C}/{}^{12}\\text{C}\\) ratio and comparing it to the modern value, we can calculate the time since death:</p>
\\[t = -\\frac{t_{1/2}}{\\ln 2} \\ln \\left(\\frac{A}{A_0}\\right) = \\frac{t_{1/2}}{\\ln 2} \\ln \\left(\\frac{A_0}{A}\\right)\\]
</div>
</div>

<div class="viz-placeholder" data-viz="viz-carbon-dating"></div>

<div class="env-block example">
<div class="env-title">Example: Dating a wooden artifact</div>
<div class="env-body">
<p>A sample of ancient wood has 25% of the \\({}^{14}\\text{C}\\) activity of a modern sample. How old is it?</p>
\\[t = \\frac{5730}{\\ln 2} \\ln\\left(\\frac{1}{0.25}\\right) = 8267 \\times \\ln(4) = 8267 \\times 1.386 = 11{,}460\\,\\text{years}\\]
<p>The wood is about 11,460 years old (two half-lives).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Limitations</div>
<div class="env-body">
<p>Radiocarbon dating assumes a constant atmospheric \\({}^{14}\\text{C}\\) production rate, which is not exactly true (solar activity, Earth's magnetic field, and human nuclear testing all affect it). Calibration curves based on tree rings and other independently dated materials correct for these variations. Beyond about 50,000 years (roughly 9 half-lives), too little \\({}^{14}\\text{C}\\) remains for reliable measurement.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-carbon-dating',
                        title: 'Carbon-14 Dating Calculator',
                        description: 'Adjust the percentage of remaining \\({}^{14}\\text{C}\\) activity to see the calculated age. The exponential decay curve shows where your sample falls.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var halfLife = 5730; // years
                            var lambda = Math.log(2) / halfLife;
                            var fractionRemaining = 0.5;

                            VizEngine.createSlider(controls, 'Remaining \u00B9\u2074C (%)', 1, 100, 50, 1, function (v) {
                                fractionRemaining = v / 100;
                            });

                            var gL = 70, gR = w - 30, gT = 50, gB = h - 50;
                            var gW = gR - gL, gH = gB - gT;
                            var maxTime = 50000; // years

                            function draw() {
                                viz.clear();

                                // Title
                                viz.screenText('Carbon-14 Dating', w / 2, 20, viz.colors.gold, 16);

                                // Axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gR, gB); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(gL, gT); ctx.lineTo(gL, gB); ctx.stroke();

                                viz.screenText('Age (years)', gR - 30, gB + 30, viz.colors.text, 11);
                                viz.screenText('\u00B9\u2074C remaining (%)', gL - 10, gT - 15, viz.colors.text, 11, 'left');

                                // Time ticks
                                for (var tt = 0; tt <= maxTime; tt += 10000) {
                                    var tx = gL + (tt / maxTime) * gW;
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(tx, gT); ctx.lineTo(tx, gB); ctx.stroke();
                                    viz.screenText((tt / 1000).toFixed(0) + 'k', tx, gB + 12, viz.colors.text, 9);
                                }

                                // Percentage ticks
                                for (var pp = 0; pp <= 100; pp += 20) {
                                    var py = gB - (pp / 100) * gH;
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(gL, py); ctx.lineTo(gR, py); ctx.stroke();
                                    viz.screenText(pp + '%', gL - 20, py, viz.colors.text, 9);
                                }

                                // Decay curve
                                ctx.strokeStyle = viz.colors.cyan; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var tt = 0; tt <= maxTime; tt += maxTime / 300) {
                                    var frac = Math.exp(-lambda * tt);
                                    var tx = gL + (tt / maxTime) * gW;
                                    var ty = gB - frac * gH;
                                    if (tt === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
                                }
                                ctx.stroke();

                                // Half-life markers
                                for (var n = 1; n <= 8; n++) {
                                    var tHL = n * halfLife;
                                    if (tHL > maxTime) break;
                                    var frac = Math.pow(0.5, n);
                                    var tx = gL + (tHL / maxTime) * gW;
                                    var ty = gB - frac * gH;
                                    ctx.fillStyle = viz.colors.teal + '44';
                                    ctx.beginPath(); ctx.arc(tx, ty, 4, 0, Math.PI * 2); ctx.fill();
                                }

                                // Current selection
                                var age = fractionRemaining > 0.001 ? -Math.log(fractionRemaining) / lambda : maxTime;
                                age = Math.min(age, maxTime);
                                var selX = gL + (age / maxTime) * gW;
                                var selY = gB - fractionRemaining * gH;

                                // Dashed lines to axes
                                ctx.setLineDash([4, 4]);
                                ctx.strokeStyle = viz.colors.gold; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(selX, selY); ctx.lineTo(selX, gB); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(selX, selY); ctx.lineTo(gL, selY); ctx.stroke();
                                ctx.setLineDash([]);

                                // Selection point
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold; ctx.shadowBlur = 12;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath(); ctx.arc(selX, selY, 7, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                // Display age
                                var ageStr = age < 1000 ? age.toFixed(0) + ' years' : (age / 1000).toFixed(1) + 'k years';
                                var pctStr = (fractionRemaining * 100).toFixed(0) + '%';

                                // Info box
                                var boxX = w / 2, boxY = gT + 20;
                                ctx.fillStyle = 'rgba(12,12,32,0.85)';
                                ctx.fillRect(boxX - 110, boxY - 12, 220, 48);
                                ctx.strokeStyle = viz.colors.gold; ctx.lineWidth = 1;
                                ctx.strokeRect(boxX - 110, boxY - 12, 220, 48);

                                viz.screenText('\u00B9\u2074C remaining: ' + pctStr, boxX, boxY + 2, viz.colors.white, 12);
                                viz.screenText('Estimated age: ' + ageStr, boxX, boxY + 22, viz.colors.gold, 13);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A bone fragment has 12.5% of its original \\({}^{14}\\text{C}\\). How old is it?',
                        hint: '12.5% = 1/8 = \\((1/2)^3\\). How many half-lives is that?',
                        solution: '\\(12.5\\% = (1/2)^3\\), so 3 half-lives have elapsed. Age = \\(3 \\times 5730 = 17{,}190\\) years.'
                    }
                ]
            }
        ]
    });
})();
