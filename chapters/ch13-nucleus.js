// === Chapter 13: Nuclear Structure ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch13',
        number: 13,
        title: 'Nuclear Structure',
        subtitle: 'Protons, neutrons, and the tiny, dense heart of every atom',
        file: 'ch13-nucleus',

        sections: [
            // ============================================================
            // Section 0: Protons and Neutrons
            // ============================================================
            {
                id: 'nucleons',
                title: 'Protons and Neutrons',
                content: `
<h2>The Building Blocks of the Nucleus</h2>

<p>Every atom has a nucleus at its center, and every nucleus is built from just two kinds of particle: <strong>protons</strong> and <strong>neutrons</strong>. Collectively, these are called <strong>nucleons</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Nucleons</div>
<div class="env-body">
<p>A <strong>proton</strong> (symbol \\(p\\)) carries a positive electric charge \\(+e = 1.602 \\times 10^{-19}\\,\\text{C}\\) and has a mass of approximately \\(1.673 \\times 10^{-27}\\,\\text{kg}\\), or about \\(938.3\\,\\text{MeV}/c^2\\).</p>
<p>A <strong>neutron</strong> (symbol \\(n\\)) is electrically neutral and has a mass of approximately \\(1.675 \\times 10^{-27}\\,\\text{kg}\\), or about \\(939.6\\,\\text{MeV}/c^2\\). It is slightly heavier than the proton.</p>
</div>
</div>

<p>The proton was identified by Ernest Rutherford in 1917 through experiments bombarding nitrogen nuclei with alpha particles. The neutron was discovered by James Chadwick in 1932, filling in a puzzle: nuclei were heavier than the protons alone could account for. Something electrically neutral had to be providing the extra mass.</p>

<div class="env-block intuition">
<div class="env-title">Why neutrons matter</div>
<div class="env-body">
<p>Protons repel each other electromagnetically. If the nucleus contained only protons, it would fly apart. Neutrons provide additional nuclear "glue" (via the strong force) without adding electrical repulsion. Heavier nuclei need proportionally more neutrons than protons to remain stable.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-nucleus-builder"></div>
`,
                visualizations: [
                    {
                        id: 'viz-nucleus-builder',
                        title: 'Interactive Nucleus Builder',
                        description: 'Add protons (red) and neutrons (blue) to build a nucleus. The nucleons cluster together and jiggle, held by the strong force. Watch how the nucleus grows as you add more particles.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var nucleons = [];
                            var centerX = w * 0.5, centerY = h * 0.45;
                            var nucleonR = 12;

                            function addNucleon(type) {
                                var angle = Math.random() * Math.PI * 2;
                                var dist = 5 + Math.random() * 10;
                                nucleons.push({
                                    type: type,
                                    x: centerX + Math.cos(angle) * dist,
                                    y: centerY + Math.sin(angle) * dist,
                                    vx: (Math.random() - 0.5) * 0.5,
                                    vy: (Math.random() - 0.5) * 0.5
                                });
                            }

                            VizEngine.createButton(controls, '+ Proton', function () { addNucleon('p'); });
                            VizEngine.createButton(controls, '+ Neutron', function () { addNucleon('n'); });
                            VizEngine.createButton(controls, 'Clear', function () { nucleons = []; });

                            // Pre-load a helium-4 nucleus
                            addNucleon('p'); addNucleon('p');
                            addNucleon('n'); addNucleon('n');

                            function draw() {
                                viz.clear();
                                var N = nucleons.length;
                                if (N === 0) {
                                    viz.screenText('Add protons and neutrons to build a nucleus', w / 2, h / 2, viz.colors.text, 14);
                                    return;
                                }

                                // Compute center of mass
                                var cmx = 0, cmy = 0;
                                for (var i = 0; i < N; i++) { cmx += nucleons[i].x; cmy += nucleons[i].y; }
                                cmx /= N; cmy /= N;

                                // Physics: attractive force toward CM + repulsion at close range + jiggle
                                for (var i = 0; i < N; i++) {
                                    var p = nucleons[i];
                                    // Attraction toward center of mass (strong force, short range)
                                    var dx = cmx - p.x, dy = cmy - p.y;
                                    var dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
                                    var attractF = 0.08;
                                    p.vx += attractF * dx / dist;
                                    p.vy += attractF * dy / dist;

                                    // Repulsion from other nucleons (Pauli exclusion + EM for protons)
                                    for (var j = 0; j < N; j++) {
                                        if (i === j) continue;
                                        var dx2 = p.x - nucleons[j].x;
                                        var dy2 = p.y - nucleons[j].y;
                                        var d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) + 0.1;
                                        if (d2 < nucleonR * 2.2) {
                                            var repF = 0.3 * (nucleonR * 2.2 - d2) / d2;
                                            // Extra repulsion between protons (Coulomb)
                                            if (p.type === 'p' && nucleons[j].type === 'p') {
                                                repF *= 1.3;
                                            }
                                            p.vx += repF * dx2 / d2;
                                            p.vy += repF * dy2 / d2;
                                        }
                                    }

                                    // Thermal jiggle
                                    p.vx += (Math.random() - 0.5) * 0.15;
                                    p.vy += (Math.random() - 0.5) * 0.15;

                                    // Damping
                                    p.vx *= 0.92;
                                    p.vy *= 0.92;

                                    p.x += p.vx;
                                    p.y += p.vy;

                                    // Keep on screen
                                    p.x = VizEngine.clamp(p.x, 40, w - 40);
                                    p.y = VizEngine.clamp(p.y, 40, h - 60);
                                }

                                // Draw nucleons with glow
                                for (var i = 0; i < N; i++) {
                                    var p = nucleons[i];
                                    var col = p.type === 'p' ? viz.colors.red : viz.colors.blue;
                                    // Glow
                                    ctx.save();
                                    ctx.shadowColor = col;
                                    ctx.shadowBlur = 15;
                                    ctx.fillStyle = col;
                                    ctx.beginPath();
                                    ctx.arc(p.x, p.y, nucleonR, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    // Highlight
                                    ctx.fillStyle = 'rgba(255,255,255,0.25)';
                                    ctx.beginPath();
                                    ctx.arc(p.x - 3, p.y - 3, nucleonR * 0.35, 0, Math.PI * 2);
                                    ctx.fill();
                                    // Label
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(p.type, p.x, p.y);
                                }

                                // Count
                                var Z = 0, NN = 0;
                                for (var i = 0; i < N; i++) {
                                    if (nucleons[i].type === 'p') Z++; else NN++;
                                }
                                var A = Z + NN;

                                // Info panel
                                viz.screenText('Z = ' + Z + ' (protons)', w / 2 - 100, h - 35, viz.colors.red, 13, 'center');
                                viz.screenText('N = ' + NN + ' (neutrons)', w / 2 + 100, h - 35, viz.colors.blue, 13, 'center');
                                viz.screenText('A = ' + A + ' (mass number)', w / 2, h - 15, viz.colors.gold, 13, 'center');

                                // Element name lookup (simple)
                                var elements = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
                                    'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
                                var name = Z < elements.length ? elements[Z] : 'Z=' + Z;
                                if (Z > 0) {
                                    viz.screenText(name + '-' + A, w / 2, 20, viz.colors.gold, 16);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A neutron is slightly heavier than a proton. Why does this mass difference matter for nuclear stability?',
                        hint: 'Think about what happens to a free neutron (one not bound in a nucleus).',
                        solution: 'A free neutron is unstable and decays into a proton, an electron, and an antineutrino (beta decay) with a half-life of about 10.2 minutes. The extra mass of the neutron provides the energy for this decay via \\(E = mc^2\\). Inside a nucleus, the binding energy can make neutron decay energetically unfavorable, stabilizing the neutron.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Atomic Number and Mass Number
            // ============================================================
            {
                id: 'atomic-mass-number',
                title: 'Atomic Number and Mass Number',
                content: `
<h2>Z and A: The Two Numbers That Define a Nucleus</h2>

<p>Every nucleus is uniquely specified by two integers:</p>

<div class="env-block definition">
<div class="env-title">Definition: Atomic Number and Mass Number</div>
<div class="env-body">
<p>The <strong>atomic number</strong> \\(Z\\) is the number of protons in a nucleus. It determines the chemical element.</p>
<p>The <strong>mass number</strong> \\(A\\) is the total number of nucleons (protons + neutrons):</p>
\\[A = Z + N\\]
<p>where \\(N\\) is the number of neutrons.</p>
<p>A nucleus is written in the standard notation:</p>
\\[{}^A_Z X\\]
<p>where \\(X\\) is the chemical symbol. For example, \\({}^{12}_6\\text{C}\\) is carbon-12: 6 protons and 6 neutrons.</p>
</div>
</div>

<p>The atomic number \\(Z\\) is the identity card of an element. Change \\(Z\\) and you change the element entirely: \\(Z = 1\\) is hydrogen, \\(Z = 2\\) is helium, \\(Z = 6\\) is carbon, \\(Z = 26\\) is iron, \\(Z = 92\\) is uranium. The periodic table is ordered by \\(Z\\).</p>

<div class="env-block example">
<div class="env-title">Example: Reading nuclear notation</div>
<div class="env-body">
<p>\\({}^{56}_{26}\\text{Fe}\\): This is iron. It has \\(Z = 26\\) protons and \\(N = A - Z = 56 - 26 = 30\\) neutrons.</p>
<p>\\({}^{235}_{92}\\text{U}\\): This is uranium-235, with 92 protons and 143 neutrons. It is the isotope used in nuclear fission.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Why include Z at all?</div>
<div class="env-body">
<p>Since the chemical symbol already tells you \\(Z\\) (every chemist knows carbon is \\(Z = 6\\)), the subscript is technically redundant. It is included for clarity, especially in nuclear reactions where keeping track of charge conservation is essential.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'How many protons and neutrons are in \\({}^{238}_{92}\\text{U}\\)?',
                        hint: 'The subscript is \\(Z\\) (protons), and \\(N = A - Z\\).',
                        solution: '\\(Z = 92\\) protons, \\(N = 238 - 92 = 146\\) neutrons. Note that uranium-238 has far more neutrons than protons; heavy nuclei need this neutron excess for stability.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Isotopes
            // ============================================================
            {
                id: 'isotopes',
                title: 'Isotopes',
                content: `
<h2>Same Element, Different Mass</h2>

<p>Atoms of the same element always have the same number of protons (same \\(Z\\)), but they can have different numbers of neutrons (different \\(N\\), different \\(A\\)). These variants are called <strong>isotopes</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Isotopes</div>
<div class="env-body">
<p><strong>Isotopes</strong> are atoms with the same atomic number \\(Z\\) but different mass numbers \\(A\\). They are chemically nearly identical (same electron configuration, same reactions) but differ in nuclear properties (mass, stability, radioactivity).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-isotopes"></div>

<p>Hydrogen provides the simplest example:</p>
<ul>
<li><strong>Protium</strong> \\({}^1_1\\text{H}\\): 1 proton, 0 neutrons. The ordinary hydrogen that makes up 99.98% of natural hydrogen.</li>
<li><strong>Deuterium</strong> \\({}^2_1\\text{H}\\): 1 proton, 1 neutron. Stable. Used in "heavy water" (D\\(_2\\)O) for nuclear reactors.</li>
<li><strong>Tritium</strong> \\({}^3_1\\text{H}\\): 1 proton, 2 neutrons. Radioactive (half-life 12.3 years). Used in fusion research and luminous paint.</li>
</ul>

<div class="env-block remark">
<div class="env-title">Isotopes in everyday life</div>
<div class="env-body">
<p>Carbon-12 and carbon-13 are both stable and present in all living things. Carbon-14 is radioactive and is produced in the atmosphere by cosmic rays; its decay is the basis of radiocarbon dating. Uranium-235 (fissile) and uranium-238 (not readily fissile) are isotopes that behave very differently in a nuclear reactor, despite being the same element.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-isotopes',
                        title: 'Hydrogen Isotopes Side by Side',
                        description: 'Protium (H-1), Deuterium (H-2), and Tritium (H-3) displayed side by side. Same number of protons (red), different numbers of neutrons (blue). All three are hydrogen.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var isotopes = [
                                { name: 'Protium', symbol: '\u00B9H', protons: 1, neutrons: 0 },
                                { name: 'Deuterium', symbol: '\u00B2H', protons: 1, neutrons: 1 },
                                { name: 'Tritium', symbol: '\u00B3H', protons: 1, neutrons: 2 }
                            ];
                            var spacing = w / 4;
                            var baseY = h * 0.45;
                            var R = 16;

                            // Jiggle state
                            var jiggle = [];
                            for (var i = 0; i < 3; i++) {
                                var arr = [];
                                for (var j = 0; j < 3; j++) {
                                    arr.push({ dx: 0, dy: 0, phase: Math.random() * Math.PI * 2, freq: 1.5 + Math.random() * 2 });
                                }
                                jiggle.push(arr);
                            }

                            function draw(now) {
                                viz.clear();
                                var t = now / 1000;

                                for (var i = 0; i < 3; i++) {
                                    var iso = isotopes[i];
                                    var cx = spacing * (i + 1);
                                    var cy = baseY;
                                    var totalNucleons = iso.protons + iso.neutrons;

                                    // Draw electron orbit
                                    ctx.strokeStyle = viz.colors.teal + '44';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, 55, 0, Math.PI * 2);
                                    ctx.stroke();

                                    // Electron
                                    var eAngle = t * 2.5 + i * 2;
                                    var ex = cx + 55 * Math.cos(eAngle);
                                    var ey = cy + 55 * Math.sin(eAngle);
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.teal;
                                    ctx.shadowBlur = 8;
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath();
                                    ctx.arc(ex, ey, 4, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    viz.screenText('e\u207B', ex + 8, ey - 8, viz.colors.teal, 9);

                                    // Draw nucleons with jiggle
                                    var nucleonPositions = [];
                                    if (totalNucleons === 1) {
                                        nucleonPositions.push({ type: 'p', ox: 0, oy: 0 });
                                    } else if (totalNucleons === 2) {
                                        nucleonPositions.push({ type: 'p', ox: -R * 0.55, oy: 0 });
                                        nucleonPositions.push({ type: 'n', ox: R * 0.55, oy: 0 });
                                    } else {
                                        // Triangle arrangement for 3
                                        nucleonPositions.push({ type: 'p', ox: 0, oy: -R * 0.6 });
                                        nucleonPositions.push({ type: 'n', ox: -R * 0.55, oy: R * 0.4 });
                                        nucleonPositions.push({ type: 'n', ox: R * 0.55, oy: R * 0.4 });
                                    }

                                    for (var j = 0; j < nucleonPositions.length; j++) {
                                        var np = nucleonPositions[j];
                                        var jg = jiggle[i][j];
                                        var jx = Math.sin(t * jg.freq + jg.phase) * 1.5;
                                        var jy = Math.cos(t * jg.freq * 1.3 + jg.phase) * 1.5;
                                        var nx = cx + np.ox + jx;
                                        var ny = cy + np.oy + jy;
                                        var col = np.type === 'p' ? viz.colors.red : viz.colors.blue;

                                        ctx.save();
                                        ctx.shadowColor = col;
                                        ctx.shadowBlur = 12;
                                        ctx.fillStyle = col;
                                        ctx.beginPath();
                                        ctx.arc(nx, ny, R, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();

                                        // Highlight
                                        ctx.fillStyle = 'rgba(255,255,255,0.2)';
                                        ctx.beginPath();
                                        ctx.arc(nx - 4, ny - 4, R * 0.3, 0, Math.PI * 2);
                                        ctx.fill();

                                        ctx.fillStyle = viz.colors.white;
                                        ctx.font = 'bold 11px -apple-system,sans-serif';
                                        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                        ctx.fillText(np.type, nx, ny);
                                    }

                                    // Labels
                                    viz.screenText(iso.name, cx, cy + 85, viz.colors.gold, 14);
                                    viz.screenText(iso.symbol, cx, cy + 103, viz.colors.white, 12);
                                    viz.screenText(iso.protons + 'p + ' + iso.neutrons + 'n', cx, cy + 120, viz.colors.text, 11);
                                }

                                // Title
                                viz.screenText('Hydrogen Isotopes', w / 2, 22, viz.colors.white, 15);

                                // Legend
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(w / 2 - 60, h - 20, 6, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('= proton', w / 2 - 40, h - 20, viz.colors.text, 10, 'left');
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(w / 2 + 30, h - 20, 6, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('= neutron', w / 2 + 50, h - 20, viz.colors.text, 10, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Carbon has three naturally occurring isotopes: C-12, C-13, and C-14. How many neutrons does each contain?',
                        hint: 'Carbon always has \\(Z = 6\\). Use \\(N = A - Z\\).',
                        solution: 'C-12: \\(N = 12 - 6 = 6\\) neutrons. C-13: \\(N = 13 - 6 = 7\\) neutrons. C-14: \\(N = 14 - 6 = 8\\) neutrons.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Nuclear Forces
            // ============================================================
            {
                id: 'nuclear-forces',
                title: 'Nuclear Forces',
                content: `
<h2>What Holds the Nucleus Together?</h2>

<p>The nucleus presents a puzzle. Protons are positively charged and repel each other via the electromagnetic force. At the tiny separations inside a nucleus (about \\(10^{-15}\\,\\text{m}\\)), this repulsion is enormous. What overcomes it?</p>

<div class="env-block definition">
<div class="env-title">Definition: Strong Nuclear Force</div>
<div class="env-body">
<p>The <strong>strong nuclear force</strong> (or strong interaction) is the force that binds protons and neutrons together in the nucleus. It has the following properties:</p>
<ul>
<li><strong>Very strong</strong>: about 100 times stronger than the electromagnetic force at nuclear distances.</li>
<li><strong>Very short range</strong>: it drops to essentially zero beyond about \\(3\\,\\text{fm}\\) (\\(3 \\times 10^{-15}\\,\\text{m}\\)).</li>
<li><strong>Charge-independent</strong>: it acts equally between proton-proton, neutron-neutron, and proton-neutron pairs.</li>
<li><strong>Repulsive at very short range</strong>: below about \\(0.5\\,\\text{fm}\\), the strong force becomes repulsive, preventing nucleons from collapsing onto each other.</li>
</ul>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Strong force vs. electromagnetic force</div>
<div class="env-body">
<p>The electromagnetic force has infinite range: it falls off as \\(1/r^2\\) but never truly vanishes. The strong force, by contrast, is like very strong glue that only works when nucleons are touching. A proton on the far side of a large nucleus barely feels the strong force from a proton on the near side, but it feels the electromagnetic repulsion from every other proton in the nucleus. This is why very large nuclei (\\(Z > 82\\), beyond lead) are all unstable: the cumulative Coulomb repulsion overwhelms the short-range strong attraction.</p>
</div>
</div>

<h3>Binding Energy</h3>

<p>When nucleons bind together, the resulting nucleus has less mass than the sum of its parts. The "missing" mass has been converted to <strong>binding energy</strong> via Einstein's relation:</p>

\\[E_B = \\Delta m \\cdot c^2\\]

<p>where \\(\\Delta m = Z m_p + N m_n - m_{\\text{nucleus}}\\) is the <strong>mass defect</strong>. The binding energy per nucleon, \\(E_B / A\\), peaks around iron-56 (\\(\\approx 8.8\\,\\text{MeV}\\) per nucleon), which is why iron is the most tightly bound nucleus and sits at the bottom of the nuclear energy valley.</p>

<div class="env-block example">
<div class="env-title">Example: Binding energy of helium-4</div>
<div class="env-body">
<p>Helium-4 has 2 protons and 2 neutrons.</p>
\\[\\Delta m = 2(1.00728) + 2(1.00866) - 4.00260 = 0.03028\\,\\text{u}\\]
\\[E_B = 0.03028 \\times 931.5\\,\\text{MeV/u} = 28.2\\,\\text{MeV}\\]
<p>Binding energy per nucleon: \\(28.2 / 4 = 7.1\\,\\text{MeV}\\). This is quite high, which is why helium-4 (the alpha particle) is exceptionally stable.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Why are all elements heavier than lead (\\(Z > 82\\)) radioactive?',
                        hint: 'Think about the range of the strong force vs. the range of electromagnetic repulsion.',
                        solution: 'The strong nuclear force is short-range (only acts between neighboring nucleons), while the electromagnetic repulsion between protons is long-range (every proton repels every other proton). In heavy nuclei, the number of proton-proton repulsion pairs grows as \\(Z(Z-1)/2\\), while the strong force only binds nearest neighbors. Beyond \\(Z = 82\\), the cumulative Coulomb repulsion exceeds the strong-force binding, making the nucleus unstable against radioactive decay.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Nuclear Size
            // ============================================================
            {
                id: 'nuclear-size',
                title: 'Nuclear Size',
                content: `
<h2>How Big Is a Nucleus?</h2>

<p>Rutherford's scattering experiments revealed that the nucleus is extraordinarily small: about \\(10^{-15}\\,\\text{m}\\) across, roughly 100,000 times smaller than the atom itself. If the atom were the size of a football stadium, the nucleus would be a marble at the center.</p>

<div class="env-block definition">
<div class="env-title">Definition: Nuclear Radius</div>
<div class="env-body">
<p>The radius of a nucleus with mass number \\(A\\) is well approximated by:</p>
\\[R = R_0 A^{1/3}\\]
<p>where \\(R_0 \\approx 1.2\\,\\text{fm} = 1.2 \\times 10^{-15}\\,\\text{m}\\).</p>
</div>
</div>

<p>The \\(A^{1/3}\\) dependence has a simple interpretation: if the radius scales as \\(A^{1/3}\\), then the volume scales as \\(R^3 \\propto A\\). Each nucleon occupies roughly the same volume, regardless of how many nucleons there are. Nuclear matter has a nearly constant density, like a liquid.</p>

<div class="viz-placeholder" data-viz="viz-nuclear-size"></div>

<div class="env-block example">
<div class="env-title">Example: Radius of uranium-238</div>
<div class="env-body">
\\[R = 1.2 \\times 238^{1/3} = 1.2 \\times 6.20 = 7.4\\,\\text{fm}\\]
<p>Compare this to hydrogen (\\(A = 1\\)): \\(R = 1.2\\,\\text{fm}\\). The uranium nucleus is about 6 times larger in radius, but 238 times heavier. The density is essentially the same.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Nuclear density</div>
<div class="env-body">
<p>Since volume scales as \\(A\\) and mass also scales as \\(A\\), the nuclear density is roughly constant at about \\(2.3 \\times 10^{17}\\,\\text{kg/m}^3\\). This is about \\(2 \\times 10^{14}\\) times the density of water. A teaspoon of nuclear matter would weigh over a billion tonnes. Neutron stars are made of matter at approximately this density.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-nuclear-size',
                        title: 'Nuclear Size vs. Mass Number',
                        description: 'See how nuclear radius grows with mass number \\(A\\). The curve \\(R = R_0 A^{1/3}\\) is plotted alongside circles representing selected nuclei drawn to scale relative to each other.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var R0 = 1.2; // fm

                            // Selected nuclei
                            var nuclei = [
                                { name: 'H', A: 1, Z: 1, color: '#58a6ff' },
                                { name: 'He', A: 4, Z: 2, color: '#3fb950' },
                                { name: 'C', A: 12, Z: 6, color: '#d29922' },
                                { name: 'Fe', A: 56, Z: 26, color: '#f0883e' },
                                { name: 'Sn', A: 120, Z: 50, color: '#bc8cff' },
                                { name: 'Pb', A: 208, Z: 82, color: '#3fb9a0' },
                                { name: 'U', A: 238, Z: 92, color: '#f85149' }
                            ];

                            // Graph area (left side)
                            var gL = 60, gR = w * 0.52, gT = 35, gB = h - 40;
                            var gW = gR - gL, gH = gB - gT;

                            // Nuclei display area (right side)
                            var dL = w * 0.58, dR = w - 20;

                            function draw() {
                                viz.clear();

                                // Graph axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(gL, gB); ctx.lineTo(gR, gB); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(gL, gT); ctx.lineTo(gL, gB); ctx.stroke();

                                viz.screenText('A', gR + 5, gB + 2, viz.colors.text, 12, 'left', 'top');
                                viz.screenText('R (fm)', gL - 5, gT - 8, viz.colors.text, 12, 'center');

                                // Axis ticks and labels
                                var maxA = 250, maxR = 8;
                                for (var a = 50; a <= 250; a += 50) {
                                    var ax = gL + (a / maxA) * gW;
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(ax, gT); ctx.lineTo(ax, gB); ctx.stroke();
                                    viz.screenText(a.toString(), ax, gB + 12, viz.colors.text, 10);
                                }
                                for (var r = 2; r <= 8; r += 2) {
                                    var ry = gB - (r / maxR) * gH;
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(gL, ry); ctx.lineTo(gR, ry); ctx.stroke();
                                    viz.screenText(r.toString(), gL - 15, ry, viz.colors.text, 10);
                                }

                                // Plot R = R0 * A^(1/3)
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var a = 1; a <= maxA; a++) {
                                    var r = R0 * Math.pow(a, 1 / 3);
                                    var sx = gL + (a / maxA) * gW;
                                    var sy = gB - (r / maxR) * gH;
                                    if (a === 1) ctx.moveTo(sx, sy);
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();

                                // Plot points for selected nuclei
                                for (var i = 0; i < nuclei.length; i++) {
                                    var nuc = nuclei[i];
                                    var r = R0 * Math.pow(nuc.A, 1 / 3);
                                    var sx = gL + (nuc.A / maxA) * gW;
                                    var sy = gB - (r / maxR) * gH;
                                    ctx.save();
                                    ctx.shadowColor = nuc.color; ctx.shadowBlur = 6;
                                    ctx.fillStyle = nuc.color;
                                    ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                    viz.screenText(nuc.name, sx + 8, sy - 8, nuc.color, 10, 'left');
                                }

                                viz.screenText('R = 1.2 A\u00B9\u00B3', gL + gW * 0.6, gT + 15, viz.colors.cyan, 12);

                                // Right side: nuclei drawn to relative scale
                                viz.screenText('Relative Sizes', (dL + dR) / 2, 20, viz.colors.white, 13);
                                var maxVisR = R0 * Math.pow(238, 1 / 3);
                                var scalePx = 28; // pixels per fm
                                var cy = h * 0.5;
                                var cx = (dL + dR) / 2;

                                // Draw from largest to smallest
                                for (var i = nuclei.length - 1; i >= 0; i--) {
                                    var nuc = nuclei[i];
                                    var r = R0 * Math.pow(nuc.A, 1 / 3);
                                    var pr = r * scalePx;
                                    ctx.save();
                                    ctx.globalAlpha = 0.25;
                                    ctx.fillStyle = nuc.color;
                                    ctx.beginPath(); ctx.arc(cx, cy, pr, 0, Math.PI * 2); ctx.fill();
                                    ctx.globalAlpha = 0.9;
                                    ctx.strokeStyle = nuc.color; ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.arc(cx, cy, pr, 0, Math.PI * 2); ctx.stroke();
                                    ctx.restore();
                                }

                                // Labels around the outside
                                for (var i = 0; i < nuclei.length; i++) {
                                    var nuc = nuclei[i];
                                    var r = R0 * Math.pow(nuc.A, 1 / 3);
                                    var pr = r * scalePx;
                                    var angle = -Math.PI / 4 + i * 0.22;
                                    var lx = cx + (pr + 12) * Math.cos(angle);
                                    var ly = cy + (pr + 12) * Math.sin(angle);
                                    viz.screenText(nuc.name + '-' + nuc.A, lx, ly, nuc.color, 9, 'left');
                                }
                            }

                            draw();
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Estimate the nuclear density in \\(\\text{kg/m}^3\\). Use \\(R_0 = 1.2\\,\\text{fm}\\) and \\(m_n \\approx 1.67 \\times 10^{-27}\\,\\text{kg}\\).',
                        hint: 'Volume of a nucleus: \\(V = \\frac{4}{3}\\pi R_0^3 A\\). Mass: \\(m \\approx A \\cdot m_n\\). Density: \\(\\rho = m / V = m_n / (\\frac{4}{3}\\pi R_0^3)\\).',
                        solution: '\\(\\rho = \\frac{m_n}{\\frac{4}{3}\\pi R_0^3} = \\frac{1.67 \\times 10^{-27}}{\\frac{4}{3}\\pi (1.2 \\times 10^{-15})^3} = \\frac{1.67 \\times 10^{-27}}{7.24 \\times 10^{-45}} \\approx 2.3 \\times 10^{17}\\,\\text{kg/m}^3\\). This is about 230 trillion times the density of water.'
                    }
                ]
            }
        ]
    });
})();
