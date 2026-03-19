// === Chapter 9: Atomic Models — A History ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch09',
        number: 9,
        title: 'Atomic Models: A History',
        subtitle: 'From ancient speculation to quantum clouds: how our picture of the atom evolved over 2,500 years',
        file: 'ch09-atomic-models',

        sections: [
            // ============================================================
            // Section 0: Democritus to Dalton
            // ============================================================
            {
                id: 'democritus-to-dalton',
                title: 'Democritus to Dalton',
                content: `
<h2>The Idea of the Atom</h2>

<p>Around 400 BCE, the Greek philosopher Democritus proposed a radical idea: if you keep cutting matter into smaller and smaller pieces, you eventually reach a fundamental, indivisible particle. He called it <em>atomos</em>, meaning "uncuttable."</p>

<div class="env-block definition">
<div class="env-title">Definition: Atom (Historical)</div>
<div class="env-body">
<p>An <strong>atom</strong> (from Greek <em>atomos</em>) is the smallest indivisible unit of matter. Democritus imagined atoms as tiny, solid, indestructible spheres differing only in shape, size, and arrangement.</p>
</div>
</div>

<p>For over two thousand years, this remained philosophical speculation with no experimental evidence. Aristotle rejected atomism in favor of continuous matter (earth, water, air, fire), and his authority dominated Western thought for centuries.</p>

<h3>Dalton's Atomic Theory (1803)</h3>

<p>John Dalton revived the atomic idea with experimental backing. Studying chemical reactions, he noticed that elements combine in fixed whole-number ratios by mass. This law of multiple proportions is naturally explained if matter consists of discrete atoms.</p>

<div class="env-block theorem">
<div class="env-title">Dalton's Postulates</div>
<div class="env-body">
<ol>
<li>All matter is made of indivisible atoms.</li>
<li>All atoms of a given element are identical in mass and properties.</li>
<li>Atoms cannot be created, destroyed, or transformed into other atoms.</li>
<li>Compounds form when atoms of different elements combine in fixed, simple ratios.</li>
</ol>
</div>
</div>

<div class="env-block remark">
<div class="env-title">What Dalton got wrong</div>
<div class="env-body">
<p>Dalton's model treated atoms as solid, featureless spheres. We now know atoms have internal structure (nucleus + electrons), atoms of the same element can have different masses (isotopes), and atoms can be split (nuclear reactions). But his core insight, that matter is discrete, was correct and revolutionary.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-model-switcher"></div>
`,
                visualizations: [
                    {
                        id: 'viz-model-switcher',
                        title: 'Atomic Models Through History',
                        description: 'Click through five historical atomic models. Each button reveals a distinct visualization: Dalton\'s solid sphere, Thomson\'s plum pudding, Rutherford\'s nuclear atom, Bohr\'s quantized orbits, and the quantum mechanical electron cloud.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            var cx = w * 0.5, cy = h * 0.5;

                            var currentModel = 0;
                            var modelNames = ['Dalton (1803)', 'Thomson (1904)', 'Rutherford (1911)', 'Bohr (1913)', 'Quantum (1926+)'];
                            var modelColors = [viz.colors.orange, viz.colors.green, viz.colors.red, viz.colors.blue, viz.colors.purple];

                            // Create model buttons
                            for (var mi = 0; mi < 5; mi++) {
                                (function (idx) {
                                    VizEngine.createButton(controls, modelNames[idx], function () {
                                        currentModel = idx;
                                    });
                                })(mi);
                            }

                            // Pre-generate random electron positions for Thomson model
                            var thomsonElectrons = [];
                            for (var te = 0; te < 8; te++) {
                                var tAngle = (te / 8) * Math.PI * 2;
                                var tRadius = 40 + Math.random() * 40;
                                thomsonElectrons.push({ angle: tAngle, r: tRadius });
                            }

                            // Pre-generate QM cloud dots
                            var cloudDots = [];
                            for (var cd = 0; cd < 1200; cd++) {
                                // 1s orbital: P(r) proportional to r^2 * exp(-2r/a0)
                                // Use rejection sampling mapped to screen
                                var rr = Math.random() * 120;
                                var prob = rr * rr * Math.exp(-rr / 20);
                                if (Math.random() < prob / 73) { // normalize roughly
                                    var cAngle = Math.random() * Math.PI * 2;
                                    cloudDots.push({ x: rr * Math.cos(cAngle), y: rr * Math.sin(cAngle) });
                                }
                            }

                            var time = 0;

                            function draw(now) {
                                time = now * 0.001;
                                viz.clear();

                                // Title bar
                                ctx.fillStyle = modelColors[currentModel];
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(modelNames[currentModel], cx, 12);

                                // Timeline at bottom
                                var tlY = h - 25;
                                var tlLeft = 60, tlRight = w - 60;
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(tlLeft, tlY);
                                ctx.lineTo(tlRight, tlY);
                                ctx.stroke();

                                var years = [1803, 1904, 1911, 1913, 1926];
                                for (var ti = 0; ti < 5; ti++) {
                                    var tx = tlLeft + (ti / 4) * (tlRight - tlLeft);
                                    var isActive = (ti === currentModel);
                                    ctx.fillStyle = isActive ? modelColors[ti] : viz.colors.text;
                                    ctx.beginPath();
                                    ctx.arc(tx, tlY, isActive ? 7 : 4, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.font = (isActive ? 'bold ' : '') + '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'top';
                                    ctx.fillText(years[ti].toString(), tx, tlY + 10);
                                }

                                // Draw the selected model
                                if (currentModel === 0) {
                                    // Dalton: solid colored sphere
                                    var grad0 = ctx.createRadialGradient(cx - 15, cy - 15, 5, cx, cy, 70);
                                    grad0.addColorStop(0, '#ffa040');
                                    grad0.addColorStop(0.7, '#cc6600');
                                    grad0.addColorStop(1, '#803300');
                                    ctx.fillStyle = grad0;
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, 70, 0, Math.PI * 2);
                                    ctx.fill();
                                    // Highlight
                                    ctx.fillStyle = 'rgba(255,255,255,0.2)';
                                    ctx.beginPath();
                                    ctx.arc(cx - 25, cy - 25, 20, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('Solid, indivisible sphere', cx, cy + 100, viz.colors.orange, 13);
                                    viz.screenText('No internal structure', cx, cy + 118, viz.colors.text, 11);

                                } else if (currentModel === 1) {
                                    // Thomson: positive sphere with embedded electrons
                                    var sphR = 80;
                                    var grad1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphR);
                                    grad1.addColorStop(0, 'rgba(59,185,80,0.35)');
                                    grad1.addColorStop(1, 'rgba(59,185,80,0.08)');
                                    ctx.fillStyle = grad1;
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, sphR, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.green + '88';
                                    ctx.lineWidth = 2;
                                    ctx.stroke();
                                    viz.screenText('+', cx, cy, viz.colors.green, 20);
                                    // Electrons embedded
                                    for (var ei = 0; ei < thomsonElectrons.length; ei++) {
                                        var elec = thomsonElectrons[ei];
                                        var eAngle = elec.angle + time * 0.2 * (ei % 2 === 0 ? 1 : -1);
                                        var ex = cx + elec.r * Math.cos(eAngle);
                                        var ey = cy + elec.r * Math.sin(eAngle);
                                        ctx.fillStyle = viz.colors.blue;
                                        ctx.beginPath();
                                        ctx.arc(ex, ey, 6, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.fillStyle = viz.colors.white;
                                        ctx.font = 'bold 9px -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText('-', ex, ey);
                                    }
                                    viz.screenText('"Plum pudding" model', cx, cy + 110, viz.colors.green, 13);
                                    viz.screenText('Electrons embedded in positive sphere', cx, cy + 128, viz.colors.text, 11);

                                } else if (currentModel === 2) {
                                    // Rutherford: tiny nucleus, orbiting electrons
                                    // Nucleus
                                    var nucR2 = 8;
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.red;
                                    ctx.shadowBlur = 20;
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, nucR2, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    viz.screenText('+', cx, cy, viz.colors.white, 12);
                                    // Electrons orbiting at various distances
                                    var orbits2 = [40, 60, 85, 110];
                                    for (var oi = 0; oi < orbits2.length; oi++) {
                                        ctx.strokeStyle = viz.colors.axis + '44';
                                        ctx.lineWidth = 0.5;
                                        ctx.beginPath();
                                        ctx.arc(cx, cy, orbits2[oi], 0, Math.PI * 2);
                                        ctx.stroke();
                                        var eAngle2 = time * (1.5 - oi * 0.3) + oi * 1.5;
                                        var ex2 = cx + orbits2[oi] * Math.cos(eAngle2);
                                        var ey2 = cy + orbits2[oi] * Math.sin(eAngle2);
                                        ctx.fillStyle = viz.colors.blue;
                                        ctx.beginPath();
                                        ctx.arc(ex2, ey2, 5, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                    viz.screenText('Tiny, dense nucleus', cx, cy + 130, viz.colors.red, 13);
                                    viz.screenText('Most of atom is empty space', cx, cy + 148, viz.colors.text, 11);

                                } else if (currentModel === 3) {
                                    // Bohr: quantized orbits with energy labels
                                    // Nucleus
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.gold;
                                    ctx.shadowBlur = 15;
                                    ctx.fillStyle = viz.colors.gold;
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();

                                    var bohrRadii = [35, 55, 80, 110];
                                    var bohrLabels = ['n=1', 'n=2', 'n=3', 'n=4'];
                                    var bohrColors = [viz.colors.cyan, viz.colors.blue, viz.colors.teal, viz.colors.green];

                                    for (var bi = 0; bi < bohrRadii.length; bi++) {
                                        ctx.strokeStyle = bohrColors[bi] + '66';
                                        ctx.lineWidth = 2;
                                        ctx.setLineDash([6, 4]);
                                        ctx.beginPath();
                                        ctx.arc(cx, cy, bohrRadii[bi], 0, Math.PI * 2);
                                        ctx.stroke();
                                        ctx.setLineDash([]);
                                        viz.screenText(bohrLabels[bi], cx + bohrRadii[bi] + 14, cy, bohrColors[bi], 10, 'left');
                                    }
                                    // Electron on n=2 orbit
                                    var electronN = 1; // index into bohrRadii
                                    var bAngle = time * 1.2;
                                    var bex = cx + bohrRadii[electronN] * Math.cos(bAngle);
                                    var bey = cy + bohrRadii[electronN] * Math.sin(bAngle);
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.cyan;
                                    ctx.shadowBlur = 12;
                                    ctx.fillStyle = viz.colors.cyan;
                                    ctx.beginPath();
                                    ctx.arc(bex, bey, 6, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();

                                    viz.screenText('Only specific orbits allowed', cx, cy + 130, viz.colors.blue, 13);
                                    viz.screenText('Electron "jumps" between quantized levels', cx, cy + 148, viz.colors.text, 11);

                                } else if (currentModel === 4) {
                                    // Quantum: probability cloud
                                    // Draw cloud dots with varying alpha
                                    for (var qi = 0; qi < cloudDots.length; qi++) {
                                        var dot = cloudDots[qi];
                                        var dist = Math.sqrt(dot.x * dot.x + dot.y * dot.y);
                                        var alpha = VizEngine.clamp(1.0 - dist / 120, 0.1, 0.9);
                                        // Shimmer
                                        var shimmer = 0.5 + 0.5 * Math.sin(time * 2 + qi * 0.3);
                                        ctx.fillStyle = 'rgba(188,140,255,' + (alpha * shimmer * 0.7).toFixed(3) + ')';
                                        ctx.beginPath();
                                        ctx.arc(cx + dot.x, cy + dot.y, 1.8, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                    // Nucleus dot
                                    ctx.fillStyle = viz.colors.gold;
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
                                    ctx.fill();

                                    viz.screenText('Probability cloud (orbital)', cx, cy + 130, viz.colors.purple, 13);
                                    viz.screenText('Electron has no definite orbit, only probability', cx, cy + 148, viz.colors.text, 11);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why did Democritus\'s idea of atoms remain purely philosophical for over 2,000 years?',
                        hint: 'Think about what would be needed to test the idea.',
                        solution: 'There were no experimental methods to detect individual atoms or to test predictions of atomic theory. Without experiments, atomism remained a philosophical speculation competing with Aristotle\'s equally plausible (to the ancients) continuous-matter theory. Only when chemistry advanced enough to measure precise mass ratios in reactions (late 1700s) did atomic theory gain empirical support.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Thomson's Plum Pudding
            // ============================================================
            {
                id: 'thomson-plum-pudding',
                title: 'Thomson\'s Plum Pudding',
                content: `
<h2>Discovering the Electron</h2>

<p>In 1897, J.J. Thomson discovered the electron using cathode ray tubes. By deflecting cathode rays with electric and magnetic fields, he measured the charge-to-mass ratio \\(e/m\\) and showed it was the same regardless of the cathode material. This meant electrons were a universal component of all atoms.</p>

<div class="env-block definition">
<div class="env-title">Definition: Cathode Rays</div>
<div class="env-body">
<p><strong>Cathode rays</strong> are streams of electrons emitted from the negative electrode (cathode) in an evacuated tube when a high voltage is applied. Thomson showed these were negatively charged particles with a definite \\(e/m\\) ratio.</p>
</div>
</div>

<p>Thomson measured:</p>
\\[\\frac{e}{m_e} = 1.76 \\times 10^{11}\\;\\text{C/kg}\\]

<p>This was about 1,800 times larger than the \\(e/m\\) ratio for hydrogen ions, meaning either the electron charge was much larger or its mass much smaller. Later measurements (Millikan's oil drop experiment, 1909) pinned down \\(e = 1.6 \\times 10^{-19}\\) C, confirming that the electron mass is about \\(\\frac{1}{1836}\\) of a proton.</p>

<h3>The Plum Pudding Model (1904)</h3>

<p>Since atoms are electrically neutral but contain negatively charged electrons, Thomson reasoned that there must be positive charge as well. His model: the atom is a uniform sphere of positive charge with electrons embedded in it, like plums in a pudding (or raisins in a bun).</p>

<div class="env-block intuition">
<div class="env-title">Why "plum pudding"?</div>
<div class="env-body">
<p>Imagine a ball of positively charged jelly with small negative electrons scattered throughout, held in equilibrium by the electrostatic attraction to the surrounding positive charge. The atom has no nucleus, no empty space; it is uniformly filled. This was a perfectly reasonable model given the evidence at the time.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Thomson's model made testable predictions</div>
<div class="env-body">
<p>If atoms are soft, diffuse spheres of charge, then a beam of charged particles fired at a thin foil should pass through with at most minor deflections. There would be no concentrated mass to cause large-angle scattering. This prediction would be tested by Rutherford's experiment, with shocking results.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Thomson measured \\(e/m_e = 1.76 \\times 10^{11}\\) C/kg. Given \\(e = 1.6 \\times 10^{-19}\\) C, calculate the electron mass.',
                        hint: '\\(m_e = e / (e/m_e)\\).',
                        solution: '\\(m_e = \\frac{1.6 \\times 10^{-19}}{1.76 \\times 10^{11}} = 9.1 \\times 10^{-31}\\) kg. This is about 1/1836 of the proton mass.'
                    },
                    {
                        question: 'In Thomson\'s plum pudding model, what holds the electrons in place inside the atom?',
                        hint: 'The atom is overall neutral. What force does the surrounding positive charge exert?',
                        solution: 'The electrostatic attraction between the negatively charged electrons and the surrounding uniform positive charge acts as a restoring force, pulling each electron toward the center of the positive sphere. The electrons settle at equilibrium positions where the net force is zero.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Rutherford's Nucleus
            // ============================================================
            {
                id: 'rutherford-nucleus',
                title: 'Rutherford\'s Nucleus',
                content: `
<h2>The Gold Foil Experiment</h2>

<p>In 1909, Ernest Rutherford directed Hans Geiger and Ernest Marsden to fire alpha particles (\\(\\alpha\\), helium nuclei with charge +2e) at a thin gold foil. According to Thomson's model, the alpha particles should pass through with tiny deflections at most, since the positive charge was spread out over the entire atom.</p>

<h3>The Shocking Result</h3>

<p>Most alpha particles did pass straight through, as expected. But a small fraction (about 1 in 8,000) were deflected through large angles, and some bounced almost straight back. Rutherford later said:</p>

<div class="env-block remark">
<div class="env-title">Rutherford's famous quote</div>
<div class="env-body">
<p>"It was quite the most incredible event that has ever happened to me in my life. It was almost as incredible as if you fired a 15-inch shell at a piece of tissue paper and it came back and hit you."</p>
</div>
</div>

<h3>The Nuclear Model (1911)</h3>

<p>To explain large-angle scattering, Rutherford proposed that the positive charge and nearly all the mass of the atom is concentrated in a tiny, dense <strong>nucleus</strong>, roughly \\(10^{-15}\\) m in radius, while the atom itself is about \\(10^{-10}\\) m. The electrons orbit this nucleus at relatively large distances.</p>

<div class="env-block theorem">
<div class="env-title">Key Numbers</div>
<div class="env-body">
<p>Atomic radius: \\(r_{\\text{atom}} \\sim 10^{-10}\\) m (1 angstrom)</p>
<p>Nuclear radius: \\(r_{\\text{nucleus}} \\sim 10^{-15}\\) m (1 femtometer)</p>
<p>Ratio: \\(\\frac{r_{\\text{atom}}}{r_{\\text{nucleus}}} \\sim 10^5\\)</p>
<p>If the nucleus were a marble (1 cm), the atom would be about 1 km across. The atom is overwhelmingly empty space.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Rutherford's model had a fatal flaw</div>
<div class="env-body">
<p>Classical electrodynamics predicts that an orbiting electron (an accelerating charge) must continuously radiate electromagnetic energy. It would spiral into the nucleus in about \\(10^{-11}\\) seconds. Rutherford's model cannot explain why atoms are stable. This puzzle would be resolved by Bohr.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If the nucleus were scaled up to a 1 cm marble, how far away would the outermost electron be?',
                        hint: 'The ratio of atomic radius to nuclear radius is about \\(10^5\\). Scale 1 cm by this factor.',
                        solution: '\\(1\\text{ cm} \\times 10^5 = 10^5\\text{ cm} = 1\\text{ km}\\). The electron would orbit about 1 kilometer away from a 1 cm nucleus.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Bohr's Orbits
            // ============================================================
            {
                id: 'bohr-orbits',
                title: 'Bohr\'s Orbits',
                content: `
<h2>Quantized Orbits</h2>

<p>In 1913, Niels Bohr proposed a radical fix for the instability of Rutherford's atom. He postulated that electrons can only occupy certain specific orbits without radiating energy. An electron radiates (or absorbs) energy only when it <em>jumps</em> between allowed orbits.</p>

<div class="env-block theorem">
<div class="env-title">Bohr's Postulates</div>
<div class="env-body">
<ol>
<li>Electrons orbit the nucleus in certain <strong>stationary states</strong> without radiating energy.</li>
<li>The angular momentum of the electron is quantized: \\(L = n\\hbar\\), where \\(n = 1, 2, 3, \\ldots\\) and \\(\\hbar = h/(2\\pi)\\).</li>
<li>Radiation is emitted or absorbed only during transitions between stationary states, with photon energy \\(E_{\\text{photon}} = |E_f - E_i|\\).</li>
</ol>
</div>
</div>

<p>From these postulates, Bohr derived the allowed orbital radii and energy levels for hydrogen:</p>

\\[r_n = n^2 \\, a_0, \\qquad a_0 = 0.529 \\text{ angstrom (Bohr radius)}\\]

\\[E_n = -\\frac{13.6\\text{ eV}}{n^2}\\]

<div class="env-block example">
<div class="env-title">Example: Ground State of Hydrogen</div>
<div class="env-body">
<p>For \\(n = 1\\): \\(r_1 = a_0 = 0.529\\) angstrom and \\(E_1 = -13.6\\) eV. The negative sign means the electron is bound; you need to supply 13.6 eV to ionize the atom.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why "quantized"?</div>
<div class="env-body">
<p>Think of a staircase versus a ramp. On a ramp, you can stand at any height. On a staircase, you can only stand on specific steps. Bohr said the electron's energy is like a staircase: only certain discrete values are allowed. Between steps, there is nothing.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Calculate the radius and energy of the \\(n = 3\\) orbit in hydrogen.',
                        hint: 'Use \\(r_n = n^2 a_0\\) and \\(E_n = -13.6/n^2\\) eV.',
                        solution: '\\(r_3 = 9 \\times 0.529 = 4.76\\) angstrom. \\(E_3 = -13.6/9 = -1.51\\) eV.'
                    },
                    {
                        question: 'How much energy is released when an electron drops from \\(n = 3\\) to \\(n = 1\\) in hydrogen?',
                        hint: '\\(\\Delta E = |E_1 - E_3|\\).',
                        solution: '\\(\\Delta E = |-13.6 - (-1.51)| = 12.09\\) eV. This photon is in the ultraviolet (Lyman series).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Quantum Mechanical Model
            // ============================================================
            {
                id: 'quantum-model',
                title: 'Quantum Mechanical Model',
                content: `
<h2>Beyond Bohr: The Electron Cloud</h2>

<p>Bohr's model was a brilliant step forward, but it had serious limitations. It worked well for hydrogen but failed for multi-electron atoms. It could not explain the fine structure of spectral lines or the behavior of atoms in magnetic fields. And it still pictured the electron as a classical particle moving in a definite orbit.</p>

<h3>The Wave Mechanical Revolution (1925-1926)</h3>

<p>Heisenberg, Schrodinger, and Born developed a fundamentally new framework: <strong>quantum mechanics</strong>. In this picture, the electron does not have a definite position or orbit. Instead, it is described by a wave function \\(\\psi(\\mathbf{r})\\) whose square \\(|\\psi|^2\\) gives the <em>probability density</em> for finding the electron at each point in space.</p>

<div class="env-block definition">
<div class="env-title">Definition: Orbital</div>
<div class="env-body">
<p>An <strong>orbital</strong> is a region of space where the probability of finding the electron is high (typically where \\(|\\psi|^2\\) contains 90% of the total probability). Orbitals are described by quantum numbers \\((n, l, m_l)\\) and have characteristic shapes (s, p, d, f).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Orbits vs. Orbitals</div>
<div class="env-body">
<p>A Bohr <strong>orbit</strong> is a definite circular path the electron follows, like a planet around a star. A quantum <strong>orbital</strong> is a probability cloud, a fuzzy region where the electron is <em>likely</em> to be found. The electron does not trace a path; it exists as a spread-out probability distribution. This is not a limitation of our knowledge but a fundamental feature of nature.</p>
</div>
</div>

<h3>Why the Quantum Model Wins</h3>

<ul>
<li>Correctly predicts spectra of all atoms, not just hydrogen.</li>
<li>Explains chemical bonding, molecular structure, and the periodic table.</li>
<li>Accounts for fine structure, the Zeeman effect, and spin-orbit coupling.</li>
<li>Consistent with the uncertainty principle: \\(\\Delta x \\cdot \\Delta p \\geq \\hbar/2\\).</li>
</ul>

<div class="env-block intuition">
<div class="env-title">The progression of models</div>
<div class="env-body">
<p>Each model was an improvement, not a mistake. Dalton showed matter is discrete. Thomson showed atoms have internal structure. Rutherford found the nucleus. Bohr introduced quantization. Quantum mechanics gave us the complete picture. Science advances by building on what came before, even when earlier models are superseded.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'What is the fundamental difference between a Bohr orbit and a quantum orbital?',
                        hint: 'Think about what you can know about the electron\'s position in each model.',
                        solution: 'A Bohr orbit specifies the electron\'s position exactly (on a circle of definite radius). A quantum orbital gives only a probability distribution for the electron\'s position; the electron has no definite trajectory. In quantum mechanics, you can only predict the probability of finding the electron in a given region, not its exact location at any instant.'
                    },
                    {
                        question: 'List one success and one failure of each model: Thomson, Rutherford, and Bohr.',
                        hint: 'What did each model explain correctly? What could it not explain?',
                        solution: 'Thomson: success, explained that atoms contain electrons; failure, predicted no large-angle scattering (contradicted by Rutherford). Rutherford: success, explained large-angle scattering with a nuclear model; failure, could not explain atomic stability (electrons should radiate and spiral in). Bohr: success, correctly predicted hydrogen spectral lines; failure, did not work for multi-electron atoms and could not explain fine structure.'
                    }
                ]
            }
        ]
    });
})();
