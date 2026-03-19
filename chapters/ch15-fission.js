// === Chapter 15: Nuclear Fission ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch15',
        number: 15,
        title: 'Nuclear Fission',
        subtitle: 'Splitting atoms, chain reactions, and the power of the nucleus unleashed',
        file: 'ch15-fission',

        sections: [
            // ============================================================
            // Section 0: Splitting the Atom
            // ============================================================
            {
                id: 'splitting-atom',
                title: 'Splitting the Atom',
                content: `
<h2>Breaking a Nucleus in Two</h2>

<p>In 1938, Otto Hahn and Fritz Strassmann discovered that bombarding uranium with neutrons produced barium, an element roughly half the mass of uranium. Lise Meitner and Otto Frisch realized what had happened: the uranium nucleus had split in two. They called it <strong>fission</strong>, borrowing the term from cell biology.</p>

<div class="env-block definition">
<div class="env-title">Definition: Nuclear Fission</div>
<div class="env-body">
<p><strong>Nuclear fission</strong> is the process in which a heavy nucleus splits into two (or rarely more) lighter nuclei, releasing a large amount of energy and typically 2 or 3 free neutrons.</p>
</div>
</div>

<h3>Why Does Fission Release Energy?</h3>

<p>Recall the binding energy curve: the binding energy per nucleon peaks at iron (\\(A \\approx 56\\)) and decreases for heavier nuclei. When a very heavy nucleus (like uranium, \\(A = 235\\)) splits into two medium-weight fragments (\\(A \\approx 90\\) to \\(140\\)), the fragments are more tightly bound per nucleon than the original. The difference in binding energy is released, primarily as kinetic energy of the fragments.</p>

<div class="env-block example">
<div class="env-title">Example: Energy from one fission event</div>
<div class="env-body">
<p>The binding energy per nucleon for U-235 is about 7.6 MeV; for the fission products, it is about 8.5 MeV. The energy released per fission is roughly:</p>
\\[\\Delta E \\approx 235 \\times (8.5 - 7.6) = 235 \\times 0.9 \\approx 200\\,\\text{MeV}\\]
<p>This is about \\(3.2 \\times 10^{-11}\\,\\text{J}\\) per fission event, a million times more energy per reaction than any chemical reaction.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Scale comparison</div>
<div class="env-body">
<p>Burning one carbon atom in oxygen releases about 4 eV. Fissioning one uranium-235 atom releases about 200 MeV, roughly 50 million times more. This is why 1 kg of uranium fuel contains as much energy as about 2,500 tonnes of coal.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If each fission of U-235 releases 200 MeV, how much energy (in joules) is released by the fission of 1 gram of U-235? (Avogadro: \\(6.02 \\times 10^{23}\\), 1 MeV = \\(1.6 \\times 10^{-13}\\) J)',
                        hint: 'Number of atoms in 1 g of U-235: \\(N = (1/235) \\times 6.02 \\times 10^{23}\\).',
                        solution: '\\(N = 6.02 \\times 10^{23} / 235 = 2.56 \\times 10^{21}\\) atoms. Energy = \\(2.56 \\times 10^{21} \\times 200 \\times 10^6 \\times 1.6 \\times 10^{-19}\\,\\text{J} = 8.2 \\times 10^{10}\\,\\text{J} \\approx 82\\,\\text{GJ}\\). This is about 23,000 kWh, enough to power an average household for over 2 years.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Neutron-Induced Fission
            // ============================================================
            {
                id: 'neutron-fission',
                title: 'Neutron-Induced Fission',
                content: `
<h2>A Neutron Triggers the Split</h2>

<p>While some heavy nuclei undergo spontaneous fission, the process is extremely slow. In practice, fission is triggered by the absorption of a neutron. The neutron is electrically neutral, so it is not repelled by the positive charge of the nucleus and can approach at any speed.</p>

<div class="env-block definition">
<div class="env-title">Definition: Neutron-Induced Fission</div>
<div class="env-body">
<p>A thermal (slow) neutron is absorbed by a fissile nucleus, forming a highly excited compound nucleus that promptly splits:</p>
\\[{}^{235}_{92}\\text{U} + n \\rightarrow {}^{236}_{92}\\text{U}^* \\rightarrow \\text{Fragment}_1 + \\text{Fragment}_2 + 2\\text{-}3\\,n + \\text{energy}\\]
<p>A typical reaction:</p>
\\[{}^{235}_{92}\\text{U} + n \\rightarrow {}^{141}_{56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + 3n + 200\\,\\text{MeV}\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Fissile vs. fissionable</div>
<div class="env-body">
<p><strong>Fissile</strong> nuclei (U-235, Pu-239, U-233) can be split by <em>slow</em> (thermal) neutrons. These are the fuels for reactors and weapons.</p>
<p><strong>Fissionable</strong> nuclei (U-238, Th-232) can be split only by <em>fast</em> (high-energy) neutrons. U-238 makes up 99.3% of natural uranium but is not fissile.</p>
</div>
</div>

<p>The liquid-drop model explains fission nicely: the absorbed neutron adds energy to the nucleus, which starts oscillating like a wobbling water droplet. If the oscillation is large enough, the "droplet" elongates into a dumbbell shape and pinches apart, driven by the electrostatic repulsion between the two halves.</p>

<div class="env-block intuition">
<div class="env-title">Why slow neutrons work best</div>
<div class="env-body">
<p>A slow neutron spends more time near the nucleus, increasing the probability of capture. For U-235, the fission cross-section (a measure of probability) is about 580 barns for thermal neutrons (0.025 eV) but only about 1 barn for fast neutrons (1 MeV). Slowing neutrons down dramatically increases the fission rate.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Verify charge and mass conservation in: \\({}^{235}_{92}\\text{U} + n \\rightarrow {}^{141}_{56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + 3n\\).',
                        hint: 'Add up the total number of protons and nucleons on each side.',
                        solution: 'Left: \\(Z = 92 + 0 = 92\\), \\(A = 235 + 1 = 236\\). Right: \\(Z = 56 + 36 + 0 = 92\\), \\(A = 141 + 92 + 3 = 236\\). Both charge and mass number are conserved.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Chain Reactions
            // ============================================================
            {
                id: 'chain-reactions',
                title: 'Chain Reactions',
                content: `
<h2>Neutrons Breeding Neutrons</h2>

<p>Each fission of U-235 releases 2 or 3 neutrons. If at least one of those neutrons triggers another fission, which releases more neutrons, which trigger more fissions, the process sustains itself. This is a <strong>chain reaction</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Chain Reaction</div>
<div class="env-body">
<p>A <strong>nuclear chain reaction</strong> is a self-sustaining series of fission events in which the neutrons produced by each fission trigger further fissions.</p>
<p>The <strong>multiplication factor</strong> \\(k\\) is the average number of neutrons from one fission that go on to cause another fission:</p>
<ul>
<li>\\(k < 1\\): <strong>subcritical</strong>; the chain reaction dies out.</li>
<li>\\(k = 1\\): <strong>critical</strong>; the reaction is self-sustaining at a constant rate.</li>
<li>\\(k > 1\\): <strong>supercritical</strong>; the reaction grows exponentially.</li>
</ul>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-chain-reaction"></div>

<div class="env-block warning">
<div class="env-title">Controlled vs. uncontrolled</div>
<div class="env-body">
<p>A nuclear reactor operates at \\(k = 1\\) (critical). A nuclear weapon requires \\(k \\gg 1\\) (prompt supercritical) for an extremely rapid energy release. The difference is one of engineering, not principle: both rely on the same physics.</p>
</div>
</div>

<p>What determines whether a neutron causes another fission? It might:</p>
<ul>
<li>Hit another U-235 nucleus and cause fission (desired)</li>
<li>Be absorbed by U-238 without causing fission (lost)</li>
<li>Be absorbed by a control material (absorbed deliberately)</li>
<li>Escape out of the material entirely (lost)</li>
</ul>

<p>The balance of these outcomes determines \\(k\\).</p>
`,
                visualizations: [
                    {
                        id: 'viz-chain-reaction',
                        title: 'Chain Reaction Simulation',
                        description: 'One neutron hits a U-235 nucleus, splitting it into fragments and releasing more neutrons. Each new neutron can trigger more fissions, branching exponentially. Use control rods to absorb neutrons and control the reaction. Watch the generation counter and fission rate.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var nuclei = [];
                            var neutrons = [];
                            var fragments = [];
                            var flashes = [];
                            var fissionCount = 0;
                            var generation = 0;
                            var running = false;
                            var controlRodLevel = 0.0; // 0 = no absorption, 1 = full absorption
                            var nucleusR = 12;
                            var neutronR = 3;

                            // Create a grid of fissile nuclei
                            function initNuclei() {
                                nuclei = [];
                                var cols = 12, rows = 8;
                                var spacingX = (w - 80) / cols;
                                var spacingY = (h - 80) / rows;
                                for (var r = 0; r < rows; r++) {
                                    for (var c = 0; c < cols; c++) {
                                        nuclei.push({
                                            x: 50 + c * spacingX + (Math.random() - 0.5) * 8,
                                            y: 50 + r * spacingY + (Math.random() - 0.5) * 8,
                                            alive: true
                                        });
                                    }
                                }
                            }
                            initNuclei();

                            VizEngine.createSlider(controls, 'Control Rods', 0, 1.0, 0, 0.05, function (v) {
                                controlRodLevel = v;
                            });

                            VizEngine.createButton(controls, 'Fire Neutron', function () {
                                if (!running) {
                                    running = true;
                                    fissionCount = 0;
                                    generation = 0;
                                }
                                neutrons.push({
                                    x: 0,
                                    y: h * 0.4 + (Math.random() - 0.5) * 40,
                                    vx: 2.5 + Math.random() * 1,
                                    vy: (Math.random() - 0.5) * 1.0,
                                    gen: generation
                                });
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                running = false;
                                neutrons = [];
                                fragments = [];
                                flashes = [];
                                fissionCount = 0;
                                generation = 0;
                                initNuclei();
                            });

                            function draw(now) {
                                viz.clear();

                                // Update flashes
                                for (var fi = flashes.length - 1; fi >= 0; fi--) {
                                    flashes[fi].life -= 0.02;
                                    if (flashes[fi].life <= 0) flashes.splice(fi, 1);
                                }

                                // Update fragments
                                for (var fi = fragments.length - 1; fi >= 0; fi--) {
                                    var fr = fragments[fi];
                                    fr.x += fr.vx;
                                    fr.y += fr.vy;
                                    fr.life -= 0.008;
                                    if (fr.life <= 0 || fr.x < -20 || fr.x > w + 20 || fr.y < -20 || fr.y > h + 20) {
                                        fragments.splice(fi, 1);
                                    }
                                }

                                // Update neutrons
                                for (var ni = neutrons.length - 1; ni >= 0; ni--) {
                                    var n = neutrons[ni];
                                    n.x += n.vx;
                                    n.y += n.vy;

                                    // Control rod absorption
                                    if (Math.random() < controlRodLevel * 0.015) {
                                        neutrons.splice(ni, 1);
                                        continue;
                                    }

                                    // Off screen
                                    if (n.x < -20 || n.x > w + 20 || n.y < -20 || n.y > h + 20) {
                                        neutrons.splice(ni, 1);
                                        continue;
                                    }

                                    // Check collision with nuclei
                                    var hit = false;
                                    for (var j = 0; j < nuclei.length; j++) {
                                        if (!nuclei[j].alive) continue;
                                        var dx = n.x - nuclei[j].x;
                                        var dy = n.y - nuclei[j].y;
                                        var dist = Math.sqrt(dx * dx + dy * dy);
                                        if (dist < nucleusR + neutronR) {
                                            // Fission!
                                            nuclei[j].alive = false;
                                            fissionCount++;
                                            generation = n.gen + 1;
                                            hit = true;

                                            // Flash
                                            flashes.push({ x: nuclei[j].x, y: nuclei[j].y, life: 1.0 });

                                            // Spawn 2-3 new neutrons
                                            var nNew = 2 + (Math.random() < 0.5 ? 1 : 0);
                                            for (var k = 0; k < nNew; k++) {
                                                var angle = Math.random() * Math.PI * 2;
                                                var speed = 1.8 + Math.random() * 1.5;
                                                neutrons.push({
                                                    x: nuclei[j].x,
                                                    y: nuclei[j].y,
                                                    vx: speed * Math.cos(angle),
                                                    vy: speed * Math.sin(angle),
                                                    gen: generation
                                                });
                                            }

                                            // Spawn 2 fragments
                                            var fAngle = Math.random() * Math.PI;
                                            for (var k = 0; k < 2; k++) {
                                                var fa = fAngle + k * Math.PI;
                                                fragments.push({
                                                    x: nuclei[j].x,
                                                    y: nuclei[j].y,
                                                    vx: 1.2 * Math.cos(fa) + (Math.random() - 0.5) * 0.3,
                                                    vy: 1.2 * Math.sin(fa) + (Math.random() - 0.5) * 0.3,
                                                    life: 1.0,
                                                    color: Math.random() < 0.5 ? viz.colors.orange : viz.colors.purple
                                                });
                                            }

                                            neutrons.splice(ni, 1);
                                            break;
                                        }
                                    }
                                }

                                // Draw flashes
                                for (var fi = 0; fi < flashes.length; fi++) {
                                    var fl = flashes[fi];
                                    ctx.save();
                                    ctx.globalAlpha = fl.life * 0.6;
                                    var grad = ctx.createRadialGradient(fl.x, fl.y, 0, fl.x, fl.y, 40 * fl.life);
                                    grad.addColorStop(0, '#ffffff');
                                    grad.addColorStop(0.3, viz.colors.gold);
                                    grad.addColorStop(1, 'transparent');
                                    ctx.fillStyle = grad;
                                    ctx.beginPath(); ctx.arc(fl.x, fl.y, 40 * fl.life, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }

                                // Draw nuclei
                                for (var i = 0; i < nuclei.length; i++) {
                                    if (!nuclei[i].alive) continue;
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.green; ctx.shadowBlur = 6;
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.beginPath();
                                    ctx.arc(nuclei[i].x, nuclei[i].y, nucleusR, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    // Highlight
                                    ctx.fillStyle = 'rgba(255,255,255,0.15)';
                                    ctx.beginPath();
                                    ctx.arc(nuclei[i].x - 3, nuclei[i].y - 3, nucleusR * 0.35, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Draw fragments
                                for (var fi = 0; fi < fragments.length; fi++) {
                                    var fr = fragments[fi];
                                    ctx.save();
                                    ctx.globalAlpha = fr.life;
                                    ctx.shadowColor = fr.color; ctx.shadowBlur = 8;
                                    ctx.fillStyle = fr.color;
                                    ctx.beginPath();
                                    ctx.arc(fr.x, fr.y, nucleusR * 0.6, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                }

                                // Draw neutrons with trails
                                for (var ni = 0; ni < neutrons.length; ni++) {
                                    var n = neutrons[ni];
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.yellow; ctx.shadowBlur = 8;
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath();
                                    ctx.arc(n.x, n.y, neutronR, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    // Small trail
                                    ctx.strokeStyle = viz.colors.yellow + '44';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(n.x, n.y);
                                    ctx.lineTo(n.x - n.vx * 5, n.y - n.vy * 5);
                                    ctx.stroke();
                                }

                                // Control rod indicator (visual bar on the side)
                                if (controlRodLevel > 0) {
                                    var barH = h * controlRodLevel;
                                    ctx.fillStyle = viz.colors.purple + '33';
                                    ctx.fillRect(0, 0, w, barH * 0.05);
                                    viz.screenText('Control rods: ' + (controlRodLevel * 100).toFixed(0) + '%', w - 80, 15, viz.colors.purple, 10);
                                }

                                // Stats
                                var aliveCount = 0;
                                for (var i = 0; i < nuclei.length; i++) { if (nuclei[i].alive) aliveCount++; }
                                viz.screenText('Fissions: ' + fissionCount, 55, 15, viz.colors.gold, 12, 'left');
                                viz.screenText('Neutrons: ' + neutrons.length, 55, 30, viz.colors.yellow, 11, 'left');
                                viz.screenText('Remaining nuclei: ' + aliveCount, 55, 45, viz.colors.green, 11, 'left');

                                // Legend
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(w - 140, h - 30, 5, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('U-235', w - 120, h - 30, viz.colors.text, 9, 'left');
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath(); ctx.arc(w - 70, h - 30, 3, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('neutron', w - 55, h - 30, viz.colors.text, 9, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'If each fission produces 2.5 neutrons on average and \\(k = 1.5\\), how many fissions occur after 10 generations, starting from 1 neutron?',
                        hint: 'After \\(n\\) generations, the number of fissions per generation is \\(k^n\\).',
                        solution: 'Fissions in generation \\(n\\): \\(k^n = 1.5^{10} = 57.7 \\approx 58\\). Total fissions over all 10 generations: \\(\\sum_{n=0}^{9} 1.5^n = \\frac{1.5^{10} - 1}{1.5 - 1} = \\frac{57.7 - 1}{0.5} = 113\\). The exponential growth is dramatic: from 1 to 58 per generation in just 10 steps.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Critical Mass
            // ============================================================
            {
                id: 'critical-mass',
                title: 'Critical Mass',
                content: `
<h2>The Minimum Amount for a Chain Reaction</h2>

<p>In a small piece of fissile material, most neutrons escape through the surface before hitting another nucleus. The chain reaction dies out (subcritical). As the piece gets larger, the volume (which produces neutrons) grows faster than the surface area (through which neutrons escape). At a certain size, enough neutrons stay inside to sustain the chain reaction.</p>

<div class="env-block definition">
<div class="env-title">Definition: Critical Mass</div>
<div class="env-body">
<p>The <strong>critical mass</strong> is the minimum amount of fissile material needed to sustain a chain reaction (\\(k = 1\\)). Below this mass, too many neutrons escape. Above it, the reaction is supercritical.</p>
<p>For a bare sphere of uranium-235 at normal density, the critical mass is about 52 kg (a sphere roughly 17 cm in diameter). For plutonium-239, it is about 10 kg.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Surface-to-volume ratio</div>
<div class="env-body">
<p>A sphere has the smallest surface-to-volume ratio of any shape. That is why the critical mass is defined for a sphere: it is the shape that minimizes neutron leakage. A flat sheet of the same mass would be subcritical because more neutrons escape. Conversely, surrounding the sphere with a neutron reflector (like beryllium) effectively reduces the critical mass by bouncing escaping neutrons back in.</p>
</div>
</div>

<h3>Factors Affecting Critical Mass</h3>

<ul>
<li><strong>Enrichment</strong>: Higher concentration of U-235 (vs. U-238) means more fissile targets and a smaller critical mass.</li>
<li><strong>Shape</strong>: A sphere requires the least material. Elongated shapes increase leakage.</li>
<li><strong>Density</strong>: Compressing the material reduces the critical mass (neutrons travel shorter distances between nuclei). This is the principle behind implosion-type weapons.</li>
<li><strong>Neutron reflectors</strong>: Surrounding the core with a reflector returns escaping neutrons, reducing the bare critical mass.</li>
<li><strong>Moderators</strong>: Slowing neutrons increases fission probability, reducing the required mass.</li>
</ul>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Why does compressing fissile material reduce the critical mass?',
                        hint: 'Think about the mean free path of neutrons and the density of the material.',
                        solution: 'Compression increases the density, which decreases the mean free path (the average distance a neutron travels before hitting a nucleus). Shorter mean free paths mean neutrons are more likely to cause fission before escaping. The critical mass scales inversely with the square of the density: \\(m_c \\propto 1/\\rho^2\\). Doubling the density reduces the critical mass by a factor of 4.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Nuclear Reactors
            // ============================================================
            {
                id: 'nuclear-reactors',
                title: 'Nuclear Reactors',
                content: `
<h2>Controlled Fission for Energy</h2>

<p>A nuclear reactor maintains a controlled chain reaction at exactly \\(k = 1\\): each fission produces exactly one neutron that causes another fission, on average. The energy released heats a coolant, which drives turbines to generate electricity.</p>

<div class="env-block definition">
<div class="env-title">Definition: Nuclear Reactor Components</div>
<div class="env-body">
<ul>
<li><strong>Fuel</strong>: Typically enriched uranium (3-5% U-235) or mixed oxide (MOX) fuel containing plutonium.</li>
<li><strong>Moderator</strong>: Slows fast neutrons to thermal speeds. Common moderators: water (H\\(_2\\)O), heavy water (D\\(_2\\)O), graphite.</li>
<li><strong>Control rods</strong>: Made of neutron-absorbing materials (boron, cadmium, hafnium). Inserting them absorbs neutrons and decreases \\(k\\); withdrawing them increases \\(k\\).</li>
<li><strong>Coolant</strong>: Carries heat away from the core. Often the same water that serves as moderator.</li>
<li><strong>Shielding</strong>: Thick concrete and steel walls contain radiation.</li>
</ul>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-reactor"></div>

<h3>How Control Works</h3>

<p>Not all fission neutrons appear instantly. About 0.65% are <strong>delayed neutrons</strong>, emitted seconds after fission by unstable fission products. Although a small fraction, delayed neutrons are what make reactor control possible: they slow the time scale of the chain reaction from microseconds (too fast for mechanical control) to seconds (manageable with control rods).</p>

<div class="env-block remark">
<div class="env-title">Reactor safety</div>
<div class="env-body">
<p>A nuclear reactor cannot explode like a nuclear weapon. The fuel enrichment is far too low, and the geometry is designed so that any power excursion (temperature rise) naturally reduces \\(k\\) through negative feedback (thermal expansion of fuel, boiling of coolant). The Chernobyl and Fukushima accidents involved loss of cooling and meltdowns, not nuclear explosions.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-reactor',
                        title: 'Simplified Reactor Diagram',
                        description: 'A schematic nuclear reactor showing fuel rods, control rods, moderator, and coolant flow. Adjust the control rod position to change the power level. The temperature gauge shows the core temperature response.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var rodInsertion = 0.5; // 0 = fully withdrawn, 1 = fully inserted
                            var power = 0.5; // 0 to 1
                            var temp = 300; // degrees C
                            var targetPower = 0.5;

                            VizEngine.createSlider(controls, 'Control Rod Insertion', 0, 1.0, 0.5, 0.05, function (v) {
                                rodInsertion = v;
                                targetPower = 1.0 - v;
                            });

                            // Reactor vessel
                            var rvL = w * 0.15, rvR = w * 0.55, rvT = h * 0.12, rvB = h * 0.82;
                            var rvW = rvR - rvL, rvH = rvB - rvT;

                            // Fuel rod positions
                            var nFuelRods = 6;
                            var fuelRodSpacing = rvW / (nFuelRods + 1);

                            // Bubbles for coolant
                            var bubbles = [];
                            for (var i = 0; i < 30; i++) {
                                bubbles.push({
                                    x: rvL + Math.random() * rvW,
                                    y: rvT + Math.random() * rvH,
                                    r: 1 + Math.random() * 2,
                                    speed: 0.3 + Math.random() * 0.5,
                                    phase: Math.random() * Math.PI * 2
                                });
                            }

                            function draw(now) {
                                viz.clear();
                                var t = now / 1000;

                                // Update power (smooth approach to target)
                                power += (targetPower - power) * 0.02;
                                temp = 250 + power * 350;

                                // Reactor vessel
                                ctx.fillStyle = '#0a0a2a';
                                ctx.fillRect(rvL, rvT, rvW, rvH);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 3;
                                ctx.strokeRect(rvL, rvT, rvW, rvH);

                                // Coolant (water, blue tint based on temp)
                                var waterHue = VizEngine.lerp(220, 10, power);
                                ctx.fillStyle = VizEngine.hsl(waterHue, 60, 15);
                                ctx.fillRect(rvL + 2, rvT + 2, rvW - 4, rvH - 4);

                                // Bubbles
                                for (var i = 0; i < bubbles.length; i++) {
                                    var b = bubbles[i];
                                    b.y -= b.speed * (0.5 + power * 1.5);
                                    b.x += Math.sin(t * 2 + b.phase) * 0.3;
                                    if (b.y < rvT) { b.y = rvB - 5; b.x = rvL + 10 + Math.random() * (rvW - 20); }
                                    ctx.fillStyle = 'rgba(100,180,255,' + (0.1 + power * 0.2) + ')';
                                    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
                                }

                                // Fuel rods (red/orange)
                                for (var i = 0; i < nFuelRods; i++) {
                                    var fx = rvL + fuelRodSpacing * (i + 1);
                                    var fuelGlow = power * 0.8;
                                    var fuelColor = VizEngine.hsl(VizEngine.lerp(30, 0, power), 80, 30 + power * 25);

                                    ctx.save();
                                    if (power > 0.3) {
                                        ctx.shadowColor = viz.colors.orange;
                                        ctx.shadowBlur = 8 * power;
                                    }
                                    ctx.fillStyle = fuelColor;
                                    ctx.fillRect(fx - 5, rvT + 15, 10, rvH - 30);
                                    ctx.restore();

                                    // Glow effect
                                    if (power > 0.1) {
                                        ctx.save();
                                        ctx.globalAlpha = power * 0.15;
                                        var grd = ctx.createRadialGradient(fx, (rvT + rvB) / 2, 5, fx, (rvT + rvB) / 2, 25);
                                        grd.addColorStop(0, viz.colors.orange);
                                        grd.addColorStop(1, 'transparent');
                                        ctx.fillStyle = grd;
                                        ctx.fillRect(fx - 25, rvT + 15, 50, rvH - 30);
                                        ctx.restore();
                                    }
                                }

                                // Control rods (gray, from top)
                                var crDepth = rodInsertion * (rvH - 40);
                                for (var i = 0; i < nFuelRods - 1; i++) {
                                    var cx = rvL + fuelRodSpacing * (i + 1) + fuelRodSpacing / 2;
                                    ctx.fillStyle = '#555577';
                                    ctx.fillRect(cx - 4, rvT - 15, 8, crDepth + 20);
                                    // Cap
                                    ctx.fillStyle = '#7777aa';
                                    ctx.fillRect(cx - 6, rvT + crDepth, 12, 6);
                                }

                                // Labels inside
                                viz.screenText('Reactor Vessel', (rvL + rvR) / 2, rvT - 8, viz.colors.white, 12);

                                // Legend for rods
                                viz.screenText('Fuel rods', rvL - 5, rvT + 30, viz.colors.orange, 9, 'right');
                                viz.screenText('Control rods', rvL - 5, rvT + 50, '#7777aa', 9, 'right');
                                viz.screenText('Coolant', rvL - 5, rvT + 70, viz.colors.blue, 9, 'right');

                                // Turbine/generator (right side, simple)
                                var tX = w * 0.68, tY = h * 0.4;
                                // Steam pipe
                                ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(rvR, rvT + 30); ctx.lineTo(tX - 20, tY); ctx.stroke();
                                // Return pipe
                                ctx.strokeStyle = viz.colors.blue + '88'; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(rvR, rvB - 20); ctx.lineTo(tX - 20, tY + 60); ctx.stroke();

                                viz.screenText('Steam \u2192', (rvR + tX) / 2, rvT + 15, viz.colors.text, 9);
                                viz.screenText('\u2190 Water', (rvR + tX) / 2, rvB - 10, viz.colors.blue, 9);

                                // Turbine
                                ctx.save();
                                ctx.translate(tX + 15, tY + 25);
                                ctx.rotate(t * power * 4);
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                                for (var b = 0; b < 6; b++) {
                                    var ba = b * Math.PI / 3;
                                    ctx.beginPath();
                                    ctx.moveTo(0, 0);
                                    ctx.lineTo(Math.cos(ba) * 25, Math.sin(ba) * 25);
                                    ctx.stroke();
                                }
                                ctx.restore();
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.arc(tX + 15, tY + 25, 28, 0, Math.PI * 2); ctx.stroke();
                                viz.screenText('Turbine', tX + 15, tY + 60, viz.colors.teal, 10);

                                // Generator
                                var gX = w * 0.85, gY = tY + 25;
                                ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1.5;
                                ctx.strokeRect(gX - 20, gY - 18, 40, 36);
                                viz.screenText('G', gX, gY, viz.colors.yellow, 14);
                                viz.screenText('Generator', gX, gY + 30, viz.colors.yellow, 9);

                                // Connection line
                                ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(tX + 43, tY + 25); ctx.lineTo(gX - 20, gY); ctx.stroke();

                                // Power output
                                var pMW = (power * 1000).toFixed(0);
                                viz.screenText('Output: ' + pMW + ' MW', gX, gY + 50, viz.colors.gold, 11);

                                // Temperature gauge (bottom right)
                                var gaugeX = w * 0.72, gaugeY = h * 0.78;
                                viz.screenText('Core: ' + temp.toFixed(0) + '\u00B0C', gaugeX, gaugeY, temp > 500 ? viz.colors.red : viz.colors.teal, 12);

                                // Criticality indicator
                                var kEff = 1.0 + (targetPower - power) * 0.5;
                                var kLabel = kEff < 0.99 ? 'Subcritical' : (kEff > 1.01 ? 'Supercritical' : 'Critical');
                                var kColor = kEff < 0.99 ? viz.colors.blue : (kEff > 1.01 ? viz.colors.red : viz.colors.green);
                                viz.screenText('k \u2248 ' + kEff.toFixed(3) + ' (' + kLabel + ')', gaugeX + 30, gaugeY + 20, kColor, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why is it impossible for a nuclear power reactor to explode like a nuclear weapon?',
                        hint: 'Consider the enrichment level, the geometry, and the role of delayed neutrons.',
                        solution: 'Reactor fuel is enriched to only 3-5% U-235 (weapons require >80%). The geometry is not designed to achieve prompt supercriticality. Delayed neutrons provide time for control systems to respond. Negative temperature feedback naturally reduces the reaction rate if power increases. A reactor can melt down (overheating from loss of coolant) but cannot produce a nuclear detonation.'
                    }
                ]
            }
        ]
    });
})();
