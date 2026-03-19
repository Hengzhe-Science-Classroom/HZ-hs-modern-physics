// === Chapter 17: Particle Physics Preview ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch17',
        number: 17,
        title: 'Particle Physics Preview',
        subtitle: 'Quarks, leptons, forces, and the Standard Model: the deepest layer of reality',
        file: 'ch17-particles',

        sections: [
            // ============================================================
            // Section 0: Fundamental Particles
            // ============================================================
            {
                id: 'fundamental-particles',
                title: 'Fundamental Particles',
                content: `
<h2>What Is the World Made Of?</h2>

<p>For most of the 20th century, physicists kept discovering "fundamental" particles that turned out to be made of smaller things. Atoms are made of electrons, protons, and neutrons. Protons and neutrons, in turn, are made of quarks. The current theory, called the <strong>Standard Model</strong>, identifies a set of truly fundamental particles: as far as we know, they have no internal structure.</p>

<div class="env-block definition">
<div class="env-title">Definition: Fundamental Particle</div>
<div class="env-body">
<p>A <strong>fundamental particle</strong> is a particle with no known internal structure or subcomponents. In the Standard Model, the fundamental particles are:</p>
<ul>
<li>6 <strong>quarks</strong> (and their antiquarks)</li>
<li>6 <strong>leptons</strong> (and their antiparticles)</li>
<li>4 <strong>force carriers</strong> (gauge bosons)</li>
<li>1 <strong>Higgs boson</strong></li>
</ul>
<p>All known matter in the universe is built from these particles and their interactions.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The particle zoo, tamed</div>
<div class="env-body">
<p>In the 1950s and 60s, accelerator experiments discovered hundreds of "elementary" particles (pions, kaons, hyperons, resonances), and physicists spoke of a "particle zoo." The realization that most of these are composites of quarks (hadrons) reduced the zoo to a small, elegant set of truly fundamental particles. The Standard Model is one of the great simplifications in the history of science.</p>
</div>
</div>

<p>Two categories of fundamental matter particles:</p>
<ul>
<li><strong>Quarks</strong> feel the strong force. They are never found alone; they are always bound inside composite particles called <strong>hadrons</strong> (like protons and neutrons).</li>
<li><strong>Leptons</strong> do not feel the strong force. The electron is the most familiar lepton.</li>
</ul>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Why is the proton not a fundamental particle?',
                        hint: 'Think about its internal structure.',
                        solution: 'The proton is made of three quarks (two up quarks and one down quark), held together by gluons. Since it has internal structure, it is a composite particle (a hadron), not a fundamental particle.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Quarks and Leptons
            // ============================================================
            {
                id: 'quarks-leptons',
                title: 'Quarks and Leptons',
                content: `
<h2>The Matter Particles</h2>

<p>The fundamental matter particles come in three <strong>generations</strong>. Each generation is a heavier copy of the previous one. Ordinary matter is built from the first generation only; the heavier generations are produced in high-energy collisions and decay rapidly.</p>

<div class="env-block definition">
<div class="env-title">Definition: Quarks</div>
<div class="env-body">
<p>The six quarks, arranged in three generations:</p>
<table>
<tr><th>Generation</th><th>Quark</th><th>Charge</th><th>Approx. Mass</th></tr>
<tr><td>1st</td><td>up (u)</td><td>\\(+\\frac{2}{3}e\\)</td><td>2.2 MeV</td></tr>
<tr><td>1st</td><td>down (d)</td><td>\\(-\\frac{1}{3}e\\)</td><td>4.7 MeV</td></tr>
<tr><td>2nd</td><td>charm (c)</td><td>\\(+\\frac{2}{3}e\\)</td><td>1,270 MeV</td></tr>
<tr><td>2nd</td><td>strange (s)</td><td>\\(-\\frac{1}{3}e\\)</td><td>96 MeV</td></tr>
<tr><td>3rd</td><td>top (t)</td><td>\\(+\\frac{2}{3}e\\)</td><td>173,000 MeV</td></tr>
<tr><td>3rd</td><td>bottom (b)</td><td>\\(-\\frac{1}{3}e\\)</td><td>4,180 MeV</td></tr>
</table>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Leptons</div>
<div class="env-body">
<p>The six leptons:</p>
<table>
<tr><th>Generation</th><th>Lepton</th><th>Charge</th><th>Approx. Mass</th></tr>
<tr><td>1st</td><td>electron (e)</td><td>\\(-e\\)</td><td>0.511 MeV</td></tr>
<tr><td>1st</td><td>electron neutrino (\\(\\nu_e\\))</td><td>0</td><td>< 0.0001 MeV</td></tr>
<tr><td>2nd</td><td>muon (\\(\\mu\\))</td><td>\\(-e\\)</td><td>106 MeV</td></tr>
<tr><td>2nd</td><td>muon neutrino (\\(\\nu_\\mu\\))</td><td>0</td><td>< 0.0001 MeV</td></tr>
<tr><td>3rd</td><td>tau (\\(\\tau\\))</td><td>\\(-e\\)</td><td>1,777 MeV</td></tr>
<tr><td>3rd</td><td>tau neutrino (\\(\\nu_\\tau\\))</td><td>0</td><td>< 0.0001 MeV</td></tr>
</table>
</div>
</div>

<h3>Building Protons and Neutrons</h3>

<p>A proton = uud: two up quarks and one down quark. Charge: \\(+\\frac{2}{3} + \\frac{2}{3} - \\frac{1}{3} = +1\\). Correct.</p>
<p>A neutron = udd: one up quark and two down quarks. Charge: \\(+\\frac{2}{3} - \\frac{1}{3} - \\frac{1}{3} = 0\\). Correct.</p>

<div class="viz-placeholder" data-viz="viz-proton-quarks"></div>

<div class="env-block remark">
<div class="env-title">Confinement</div>
<div class="env-body">
<p>Quarks can never be isolated. If you try to pull a quark out of a proton, the energy stored in the strong force field between the quarks grows until it creates a new quark-antiquark pair. This phenomenon, called <strong>color confinement</strong>, means quarks are always found in bound states: three quarks (baryons, like protons and neutrons) or a quark-antiquark pair (mesons, like pions).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-proton-quarks',
                        title: 'Inside the Proton: Quarks and Gluons',
                        description: 'A proton is made of 2 up quarks (red-orange) and 1 down quark (blue), connected by "gluon springs" representing the strong force. The quarks jiggle and the gluon connections stretch and vibrate. This is a schematic, not a literal picture; in reality, the interior is a seething quantum sea.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var cx = w * 0.5, cy = h * 0.45;
                            var protonR = Math.min(w, h) * 0.28;

                            // Quark positions (triangular arrangement)
                            var quarks = [
                                { label: 'u', color: viz.colors.orange, angle: -Math.PI / 2, dist: protonR * 0.42, phase: 0, freq: 1.8 },
                                { label: 'u', color: viz.colors.orange, angle: Math.PI / 6 + 1.0, dist: protonR * 0.42, phase: 2, freq: 2.1 },
                                { label: 'd', color: viz.colors.blue, angle: Math.PI / 6 + 3.2, dist: protonR * 0.42, phase: 4, freq: 1.5 }
                            ];
                            var quarkR = 20;

                            function draw(now) {
                                viz.clear();
                                var t = now / 1000;

                                // Proton boundary (soft glow)
                                ctx.save();
                                var grad = ctx.createRadialGradient(cx, cy, protonR * 0.7, cx, cy, protonR * 1.1);
                                grad.addColorStop(0, 'rgba(255,215,0,0.05)');
                                grad.addColorStop(0.7, 'rgba(255,215,0,0.08)');
                                grad.addColorStop(1, 'rgba(255,215,0,0)');
                                ctx.fillStyle = grad;
                                ctx.beginPath(); ctx.arc(cx, cy, protonR * 1.1, 0, Math.PI * 2); ctx.fill();

                                ctx.strokeStyle = viz.colors.gold + '44';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 6]);
                                ctx.beginPath(); ctx.arc(cx, cy, protonR, 0, Math.PI * 2); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.restore();

                                // Compute quark positions with jiggle
                                var qPos = [];
                                for (var i = 0; i < 3; i++) {
                                    var q = quarks[i];
                                    var jx = Math.sin(t * q.freq + q.phase) * 8;
                                    var jy = Math.cos(t * q.freq * 0.9 + q.phase + 1) * 8;
                                    var x = cx + Math.cos(q.angle + Math.sin(t * 0.5 + q.phase) * 0.15) * q.dist + jx;
                                    var y = cy + Math.sin(q.angle + Math.sin(t * 0.5 + q.phase) * 0.15) * q.dist + jy;
                                    qPos.push({ x: x, y: y });
                                }

                                // Draw gluon springs between quarks
                                for (var i = 0; i < 3; i++) {
                                    var j = (i + 1) % 3;
                                    var x1 = qPos[i].x, y1 = qPos[i].y;
                                    var x2 = qPos[j].x, y2 = qPos[j].y;
                                    var dx = x2 - x1, dy = y2 - y1;
                                    var len = Math.sqrt(dx * dx + dy * dy);
                                    var ux = dx / len, uy = dy / len;
                                    var nx = -uy, ny = ux;

                                    // Spring-like gluon line
                                    var coils = 8;
                                    var amp = 6 + Math.sin(t * 3 + i * 2) * 2;
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 2;
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.green;
                                    ctx.shadowBlur = 4;
                                    ctx.beginPath();
                                    ctx.moveTo(x1, y1);
                                    for (var c = 0; c <= coils * 2; c++) {
                                        var frac = (c + 1) / (coils * 2 + 2);
                                        var px = x1 + dx * frac;
                                        var py = y1 + dy * frac;
                                        var sign = (c % 2 === 0) ? 1 : -1;
                                        px += nx * amp * sign;
                                        py += ny * amp * sign;
                                        ctx.lineTo(px, py);
                                    }
                                    ctx.lineTo(x2, y2);
                                    ctx.stroke();
                                    ctx.restore();
                                }

                                // Draw quarks
                                for (var i = 0; i < 3; i++) {
                                    var q = quarks[i];
                                    var pos = qPos[i];

                                    ctx.save();
                                    ctx.shadowColor = q.color;
                                    ctx.shadowBlur = 15;
                                    ctx.fillStyle = q.color;
                                    ctx.beginPath();
                                    ctx.arc(pos.x, pos.y, quarkR, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();

                                    // Highlight
                                    ctx.fillStyle = 'rgba(255,255,255,0.25)';
                                    ctx.beginPath();
                                    ctx.arc(pos.x - 5, pos.y - 5, quarkR * 0.3, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Label
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 16px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(q.label, pos.x, pos.y);

                                    // Charge label
                                    var chg = q.label === 'u' ? '+2/3' : '-1/3';
                                    viz.screenText(chg, pos.x, pos.y + quarkR + 12, q.color, 10);
                                }

                                // Virtual gluon "particles" flying between quarks
                                var nGluons = 5;
                                for (var g = 0; g < nGluons; g++) {
                                    var pair = g % 3;
                                    var j2 = (pair + 1) % 3;
                                    var gFrac = ((t * 0.8 + g * 0.2) % 1);
                                    var gx = qPos[pair].x + (qPos[j2].x - qPos[pair].x) * gFrac;
                                    var gy = qPos[pair].y + (qPos[j2].y - qPos[pair].y) * gFrac;
                                    // Offset to follow spring path
                                    var gdx = qPos[j2].x - qPos[pair].x;
                                    var gdy = qPos[j2].y - qPos[pair].y;
                                    var glen = Math.sqrt(gdx * gdx + gdy * gdy) + 0.1;
                                    var gnx = -gdy / glen, gny = gdx / glen;
                                    gx += gnx * Math.sin(gFrac * Math.PI * 8) * 5;
                                    gy += gny * Math.sin(gFrac * Math.PI * 8) * 5;

                                    ctx.save();
                                    ctx.globalAlpha = 0.5;
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.beginPath(); ctx.arc(gx, gy, 3, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }

                                // Labels
                                viz.screenText('Proton (uud)', cx, 20, viz.colors.gold, 16);
                                viz.screenText('Charge: +2/3 + 2/3 - 1/3 = +1', cx, h - 30, viz.colors.white, 12);

                                // Legend
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(w - 100, 25, 4, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('= gluon', w - 75, 25, viz.colors.text, 9, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A pion (\\(\\pi^+\\)) is made of an up quark and an anti-down quark (\\(u\\bar{d}\\)). Verify that its charge is \\(+e\\).',
                        hint: 'An anti-down quark has the opposite charge of a down quark.',
                        solution: 'Down quark charge: \\(-1/3\\,e\\). Anti-down quark charge: \\(+1/3\\,e\\). Up quark charge: \\(+2/3\\,e\\). Total: \\(+2/3 + 1/3 = +1\\,e\\). The \\(\\pi^+\\) has charge \\(+e\\), as expected.'
                    }
                ]
            },

            // ============================================================
            // Section 2: The Four Forces
            // ============================================================
            {
                id: 'four-forces',
                title: 'The Four Forces',
                content: `
<h2>How Particles Interact</h2>

<p>In the Standard Model, forces between particles are mediated by the exchange of special particles called <strong>gauge bosons</strong>. Two particles interact by tossing a boson back and forth, like two people on ice skates throwing a ball between them (the recoil pushes them apart or pulls them together).</p>

<div class="env-block definition">
<div class="env-title">Definition: The Four Fundamental Forces</div>
<div class="env-body">
<table>
<tr><th>Force</th><th>Carrier</th><th>Acts on</th><th>Relative Strength</th><th>Range</th></tr>
<tr><td>Strong</td><td>Gluon (g)</td><td>Quarks, gluons</td><td>1</td><td>\\(\\sim 10^{-15}\\) m</td></tr>
<tr><td>Electromagnetic</td><td>Photon (\\(\\gamma\\))</td><td>Charged particles</td><td>\\(1/137\\)</td><td>Infinite</td></tr>
<tr><td>Weak</td><td>W\\(^\\pm\\), Z\\(^0\\)</td><td>All fermions</td><td>\\(10^{-6}\\)</td><td>\\(\\sim 10^{-18}\\) m</td></tr>
<tr><td>Gravity</td><td>Graviton (?)</td><td>All mass/energy</td><td>\\(10^{-39}\\)</td><td>Infinite</td></tr>
</table>
<p>Gravity is not part of the Standard Model. No quantum theory of gravity has been confirmed experimentally.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Forces and decay</div>
<div class="env-body">
<p>The <strong>strong force</strong> binds quarks into protons and neutrons, and binds protons and neutrons into nuclei. It is responsible for nuclear energy.</p>
<p>The <strong>electromagnetic force</strong> holds electrons in atoms, governs chemistry, and produces light.</p>
<p>The <strong>weak force</strong> is responsible for beta decay and for the first step of the pp chain in the Sun. Without the weak force, the Sun would not shine.</p>
<p><strong>Gravity</strong> is incredibly weak at the particle scale but dominates at large scales because it is always attractive and has infinite range.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why is the weak force weak?</div>
<div class="env-body">
<p>The W and Z bosons are very massive (about 80 and 91 GeV, respectively). By the uncertainty principle, a massive virtual particle can only exist for a very short time and therefore can only travel a very short distance. This severely limits the range and apparent strength of the weak force. If the W and Z were massless (like the photon), the weak force would be comparable in strength to electromagnetism. In fact, at very high energies, the electromagnetic and weak forces unify into a single <strong>electroweak</strong> force.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Which fundamental force is responsible for: (a) holding quarks in a proton, (b) holding electrons in an atom, (c) beta decay, (d) holding you on the surface of Earth?',
                        hint: 'Match each phenomenon to its force carrier.',
                        solution: '(a) Strong force (gluons between quarks). (b) Electromagnetic force (photon exchange between electron and proton). (c) Weak force (W boson mediates neutron-to-proton conversion). (d) Gravity (between your mass and Earth\'s mass).'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Standard Model
            // ============================================================
            {
                id: 'standard-model',
                title: 'The Standard Model',
                content: `
<h2>The Periodic Table of Particles</h2>

<p>The Standard Model of particle physics is the theoretical framework that classifies all known fundamental particles and describes three of the four fundamental forces (everything except gravity). It was developed in the 1960s and 70s, and its predictions have been confirmed by experiment with extraordinary precision.</p>

<div class="env-block theorem">
<div class="env-title">The Standard Model: Particle Content</div>
<div class="env-body">
<p><strong>Matter particles (fermions, spin 1/2):</strong></p>
<ul>
<li>6 quarks: u, d, c, s, t, b (plus their antiquarks)</li>
<li>6 leptons: e, \\(\\nu_e\\), \\(\\mu\\), \\(\\nu_\\mu\\), \\(\\tau\\), \\(\\nu_\\tau\\) (plus their antiparticles)</li>
</ul>
<p><strong>Force carriers (bosons, spin 1):</strong></p>
<ul>
<li>Gluon (g): strong force, massless</li>
<li>Photon (\\(\\gamma\\)): electromagnetic force, massless</li>
<li>W\\(^\\pm\\): weak force, 80.4 GeV</li>
<li>Z\\(^0\\): weak force, 91.2 GeV</li>
</ul>
<p><strong>The Higgs boson (spin 0):</strong></p>
<ul>
<li>Higgs (H): gives mass to W, Z, and fermions. Mass: 125 GeV.</li>
</ul>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-standard-model"></div>

<div class="env-block remark">
<div class="env-title">What the Standard Model does NOT include</div>
<div class="env-body">
<ul>
<li><strong>Gravity</strong>: No quantum theory of gravity is part of the Standard Model.</li>
<li><strong>Dark matter</strong>: Whatever makes up 27% of the universe is not in the Standard Model.</li>
<li><strong>Dark energy</strong>: The accelerating expansion of the universe is unexplained.</li>
<li><strong>Neutrino masses</strong>: The original Standard Model predicted massless neutrinos, but neutrino oscillation experiments show they have tiny masses. This requires an extension of the model.</li>
<li><strong>Matter-antimatter asymmetry</strong>: Why is the universe made of matter rather than equal parts matter and antimatter?</li>
</ul>
<p>The Standard Model is spectacularly successful but clearly incomplete.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-standard-model',
                        title: 'The Standard Model: Interactive Chart',
                        description: 'The complete Standard Model displayed as an interactive chart. Click on any particle to see its properties (mass, charge, spin). Quarks in purple/red, leptons in green, force carriers in orange, Higgs in yellow.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Particle data
                            var particles = [
                                // Quarks - Generation 1
                                { name: 'up', symbol: 'u', mass: '2.2 MeV', charge: '+2/3', spin: '1/2', type: 'quark', gen: 1, row: 0, col: 0 },
                                { name: 'down', symbol: 'd', mass: '4.7 MeV', charge: '-1/3', spin: '1/2', type: 'quark', gen: 1, row: 1, col: 0 },
                                // Quarks - Generation 2
                                { name: 'charm', symbol: 'c', mass: '1.27 GeV', charge: '+2/3', spin: '1/2', type: 'quark', gen: 2, row: 0, col: 1 },
                                { name: 'strange', symbol: 's', mass: '96 MeV', charge: '-1/3', spin: '1/2', type: 'quark', gen: 2, row: 1, col: 1 },
                                // Quarks - Generation 3
                                { name: 'top', symbol: 't', mass: '173 GeV', charge: '+2/3', spin: '1/2', type: 'quark', gen: 3, row: 0, col: 2 },
                                { name: 'bottom', symbol: 'b', mass: '4.18 GeV', charge: '-1/3', spin: '1/2', type: 'quark', gen: 3, row: 1, col: 2 },
                                // Leptons - Generation 1
                                { name: 'electron', symbol: 'e', mass: '0.511 MeV', charge: '-1', spin: '1/2', type: 'lepton', gen: 1, row: 2, col: 0 },
                                { name: 'e neutrino', symbol: '\u03BD\u2091', mass: '< 1 eV', charge: '0', spin: '1/2', type: 'lepton', gen: 1, row: 3, col: 0 },
                                // Leptons - Generation 2
                                { name: 'muon', symbol: '\u03BC', mass: '106 MeV', charge: '-1', spin: '1/2', type: 'lepton', gen: 2, row: 2, col: 1 },
                                { name: '\u03BC neutrino', symbol: '\u03BD\u03BC', mass: '< 1 eV', charge: '0', spin: '1/2', type: 'lepton', gen: 2, row: 3, col: 1 },
                                // Leptons - Generation 3
                                { name: 'tau', symbol: '\u03C4', mass: '1.78 GeV', charge: '-1', spin: '1/2', type: 'lepton', gen: 3, row: 2, col: 2 },
                                { name: '\u03C4 neutrino', symbol: '\u03BD\u03C4', mass: '< 1 eV', charge: '0', spin: '1/2', type: 'lepton', gen: 3, row: 3, col: 2 },
                                // Force carriers
                                { name: 'gluon', symbol: 'g', mass: '0', charge: '0', spin: '1', type: 'boson', gen: 0, row: 0, col: 3 },
                                { name: 'photon', symbol: '\u03B3', mass: '0', charge: '0', spin: '1', type: 'boson', gen: 0, row: 1, col: 3 },
                                { name: 'Z boson', symbol: 'Z', mass: '91.2 GeV', charge: '0', spin: '1', type: 'boson', gen: 0, row: 2, col: 3 },
                                { name: 'W boson', symbol: 'W', mass: '80.4 GeV', charge: '\u00B11', spin: '1', type: 'boson', gen: 0, row: 3, col: 3 },
                                // Higgs
                                { name: 'Higgs', symbol: 'H', mass: '125 GeV', charge: '0', spin: '0', type: 'higgs', gen: 0, row: 0, col: 4 }
                            ];

                            var selected = null;
                            var hovered = null;

                            // Grid layout
                            var gridL = 30, gridT = 60;
                            var cellW = Math.min(95, (w - 200) / 5);
                            var cellH = Math.min(75, (h - 120) / 4);
                            var gap = 4;

                            function getColor(type) {
                                if (type === 'quark') return viz.colors.purple;
                                if (type === 'lepton') return viz.colors.green;
                                if (type === 'boson') return viz.colors.orange;
                                if (type === 'higgs') return viz.colors.gold;
                                return viz.colors.text;
                            }

                            function getCellRect(p) {
                                var x = gridL + p.col * (cellW + gap);
                                var y = gridT + p.row * (cellH + gap);
                                return { x: x, y: y, w: cellW, h: cellH };
                            }

                            // Mouse interaction
                            viz.canvas.addEventListener('click', function (e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                var dpr = window.devicePixelRatio || 1;
                                var mx = (e.clientX - rect.left);
                                var my = (e.clientY - rect.top);

                                selected = null;
                                for (var i = 0; i < particles.length; i++) {
                                    var cr = getCellRect(particles[i]);
                                    if (mx >= cr.x && mx <= cr.x + cr.w && my >= cr.y && my <= cr.y + cr.h) {
                                        selected = particles[i];
                                        break;
                                    }
                                }
                            });

                            viz.canvas.addEventListener('mousemove', function (e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                var mx = (e.clientX - rect.left);
                                var my = (e.clientY - rect.top);

                                hovered = null;
                                for (var i = 0; i < particles.length; i++) {
                                    var cr = getCellRect(particles[i]);
                                    if (mx >= cr.x && mx <= cr.x + cr.w && my >= cr.y && my <= cr.y + cr.h) {
                                        hovered = particles[i];
                                        break;
                                    }
                                }
                                viz.canvas.style.cursor = hovered ? 'pointer' : 'default';
                            });

                            function draw(now) {
                                viz.clear();
                                var t = now / 1000;

                                // Title
                                viz.screenText('The Standard Model of Particle Physics', w / 2, 18, viz.colors.white, 15);

                                // Generation labels
                                for (var g = 1; g <= 3; g++) {
                                    var gx = gridL + (g - 1) * (cellW + gap) + cellW / 2;
                                    viz.screenText('Gen ' + g, gx, gridT - 12, viz.colors.text, 9);
                                }
                                viz.screenText('Bosons', gridL + 3 * (cellW + gap) + cellW / 2, gridT - 12, viz.colors.text, 9);

                                // Row labels
                                var rowLabels = ['Q: +2/3', 'Q: -1/3', 'Q: -1', 'Q: 0'];
                                var rowCategories = ['Quarks', '', 'Leptons', ''];
                                for (var r = 0; r < 4; r++) {
                                    var ry = gridT + r * (cellH + gap) + cellH / 2;
                                    if (rowCategories[r]) {
                                        var catColor = r < 2 ? viz.colors.purple : viz.colors.green;
                                        // Bracket on the left
                                        var bracketX = gridL - 5;
                                        var bracketTop = gridT + r * (cellH + gap);
                                        var bracketBot = bracketTop + 2 * cellH + gap;
                                        ctx.strokeStyle = catColor + '66'; ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.moveTo(bracketX, bracketTop);
                                        ctx.lineTo(bracketX - 8, bracketTop);
                                        ctx.lineTo(bracketX - 8, bracketBot);
                                        ctx.lineTo(bracketX, bracketBot);
                                        ctx.stroke();
                                    }
                                }

                                // Draw particle cells
                                for (var i = 0; i < particles.length; i++) {
                                    var p = particles[i];
                                    var cr = getCellRect(p);
                                    var color = getColor(p.type);
                                    var isSelected = selected === p;
                                    var isHovered = hovered === p;

                                    // Cell background
                                    ctx.fillStyle = isSelected ? color + '44' : (isHovered ? color + '22' : '#0f0f2a');
                                    ctx.fillRect(cr.x, cr.y, cr.w, cr.h);

                                    // Border
                                    ctx.strokeStyle = isSelected ? color : color + '66';
                                    ctx.lineWidth = isSelected ? 2 : 1;
                                    ctx.strokeRect(cr.x, cr.y, cr.w, cr.h);

                                    // Glow for selected
                                    if (isSelected) {
                                        ctx.save();
                                        ctx.shadowColor = color; ctx.shadowBlur = 10;
                                        ctx.strokeStyle = color; ctx.lineWidth = 2;
                                        ctx.strokeRect(cr.x, cr.y, cr.w, cr.h);
                                        ctx.restore();
                                    }

                                    // Symbol (large)
                                    ctx.fillStyle = color;
                                    ctx.font = 'bold 22px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(p.symbol, cr.x + cr.w / 2, cr.y + cr.h * 0.38);

                                    // Name (small)
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.fillText(p.name, cr.x + cr.w / 2, cr.y + cr.h * 0.7);

                                    // Mass (tiny)
                                    ctx.font = '8px -apple-system,sans-serif';
                                    ctx.fillStyle = viz.colors.text + 'aa';
                                    ctx.fillText(p.mass, cr.x + cr.w / 2, cr.y + cr.h * 0.88);
                                }

                                // Info panel for selected particle
                                var panelX = gridL + 4.2 * (cellW + gap);
                                var panelY = gridT + 1.5 * (cellH + gap);
                                var panelW = w - panelX - 10;
                                var panelH = 2.5 * cellH;

                                if (selected) {
                                    var sc = getColor(selected.type);
                                    ctx.fillStyle = '#0a0a28';
                                    ctx.fillRect(panelX, panelY, panelW, panelH);
                                    ctx.strokeStyle = sc;
                                    ctx.lineWidth = 1.5;
                                    ctx.strokeRect(panelX, panelY, panelW, panelH);

                                    var px = panelX + panelW / 2;
                                    var py = panelY + 15;
                                    var lineH = 18;

                                    ctx.fillStyle = sc;
                                    ctx.font = 'bold 18px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                    ctx.fillText(selected.name, px, py);

                                    py += lineH + 5;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.fillStyle = viz.colors.white;
                                    var info = [
                                        'Symbol: ' + selected.symbol,
                                        'Mass: ' + selected.mass,
                                        'Charge: ' + selected.charge + 'e',
                                        'Spin: ' + selected.spin,
                                        'Type: ' + selected.type
                                    ];
                                    for (var li = 0; li < info.length; li++) {
                                        ctx.fillText(info[li], px, py + li * lineH);
                                    }
                                } else {
                                    // Prompt
                                    ctx.fillStyle = '#0a0a28';
                                    ctx.fillRect(panelX, panelY, panelW, panelH);
                                    ctx.strokeStyle = viz.colors.axis;
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(panelX, panelY, panelW, panelH);
                                    viz.screenText('Click a particle', panelX + panelW / 2, panelY + panelH / 2 - 8, viz.colors.text, 12);
                                    viz.screenText('to see its properties', panelX + panelW / 2, panelY + panelH / 2 + 10, viz.colors.text, 11);
                                }

                                // Category legend at bottom
                                var legY = h - 15;
                                ctx.fillStyle = viz.colors.purple;
                                ctx.fillRect(gridL, legY - 5, 12, 12);
                                viz.screenText('Quarks', gridL + 20, legY + 1, viz.colors.purple, 9, 'left');

                                ctx.fillStyle = viz.colors.green;
                                ctx.fillRect(gridL + 80, legY - 5, 12, 12);
                                viz.screenText('Leptons', gridL + 100, legY + 1, viz.colors.green, 9, 'left');

                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(gridL + 168, legY - 5, 12, 12);
                                viz.screenText('Force carriers', gridL + 188, legY + 1, viz.colors.orange, 9, 'left');

                                ctx.fillStyle = viz.colors.gold;
                                ctx.fillRect(gridL + 290, legY - 5, 12, 12);
                                viz.screenText('Higgs', gridL + 310, legY + 1, viz.colors.gold, 9, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'The Standard Model has 17 fundamental particles (not counting antiparticles). List them by category.',
                        hint: 'Count: 6 quarks + 6 leptons + 4 gauge bosons + 1 Higgs.',
                        solution: 'Quarks: u, d, c, s, t, b (6). Leptons: e, \\(\\nu_e\\), \\(\\mu\\), \\(\\nu_\\mu\\), \\(\\tau\\), \\(\\nu_\\tau\\) (6). Gauge bosons: gluon, photon, W, Z (4). Higgs boson (1). Total: 17 fundamental particles.'
                    }
                ]
            },

            // ============================================================
            // Section 4: The Higgs Boson
            // ============================================================
            {
                id: 'higgs-boson',
                title: 'The Higgs Boson',
                content: `
<h2>The Origin of Mass</h2>

<p>The Higgs boson, predicted in 1964 by Peter Higgs and others, was the last missing piece of the Standard Model. It was discovered in 2012 at CERN's Large Hadron Collider (LHC), confirming the mechanism by which fundamental particles acquire mass.</p>

<div class="env-block definition">
<div class="env-title">Definition: The Higgs Mechanism</div>
<div class="env-body">
<p>The <strong>Higgs field</strong> is a quantum field that permeates all of space. Particles that interact with the Higgs field acquire mass; the stronger the interaction, the heavier the particle. The <strong>Higgs boson</strong> is the excitation (quantum) of this field, with a measured mass of \\(125.1\\,\\text{GeV}/c^2\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The "swimming through honey" analogy</div>
<div class="env-body">
<p>Imagine all of space is filled with a kind of honey (the Higgs field). Particles that interact strongly with this honey are slowed down; it is as if they are heavy. The photon does not interact with the honey at all, so it moves at the speed of light and has zero mass. The top quark interacts very strongly with the honey, so it is extremely heavy (173 GeV). The analogy is imperfect (it makes mass sound like friction, which it is not), but it captures the essential idea: mass is not intrinsic but arises from interaction with the Higgs field.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-annihilation"></div>

<h3>What the Higgs Does NOT Explain</h3>

<p>The Higgs mechanism gives mass to the W and Z bosons and to the fundamental fermions (quarks and leptons). But the mass of a proton (938 MeV) is far greater than the sum of its quark masses (about 10 MeV). Most of the proton's mass comes from the energy of the strong force field inside it (via \\(E = mc^2\\)), not from the Higgs mechanism. The Higgs explains only about 1% of the mass of ordinary matter.</p>

<div class="env-block remark">
<div class="env-title">Open questions</div>
<div class="env-body">
<p>Why does the Higgs field have the value it does? Why are the quark and lepton masses what they are (spanning 12 orders of magnitude from the lightest neutrino to the top quark)? Why is the Higgs boson's mass 125 GeV and not some other value? These are among the deepest unsolved problems in physics. The Standard Model does not explain these numbers; it takes them as inputs.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">The Standard Model is not the final word</div>
<div class="env-body">
<p>The Standard Model is the most precisely tested theory in the history of science. Yet it is incomplete: it cannot account for gravity, dark matter, dark energy, the matter-antimatter asymmetry, or the pattern of particle masses. Something deeper must underlie it. Finding that deeper theory is the central quest of fundamental physics.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-annihilation',
                        title: 'Particle-Antiparticle Annihilation',
                        description: 'Watch a particle and its antiparticle approach each other and annihilate into pure energy (gamma rays). Matter and antimatter cannot coexist: when they meet, their mass is completely converted to energy via \\(E = mc^2\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var state = 'ready'; // 'ready', 'approaching', 'annihilating', 'photons'
                            var simTime = 0;
                            var particleX = w * 0.2, antiX = w * 0.8;
                            var centerY = h * 0.42;
                            var pR = 18;
                            var flashAlpha = 0;
                            var photons = [];

                            VizEngine.createButton(controls, 'Annihilate!', function () {
                                state = 'approaching';
                                simTime = 0;
                                particleX = w * 0.2;
                                antiX = w * 0.8;
                                flashAlpha = 0;
                                photons = [];
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                state = 'ready';
                                simTime = 0;
                                particleX = w * 0.2;
                                antiX = w * 0.8;
                                flashAlpha = 0;
                                photons = [];
                            });

                            function draw(now) {
                                viz.clear();
                                var t = now / 1000;
                                simTime += 1 / 60;
                                var midX = w / 2;

                                if (state === 'approaching') {
                                    particleX += 1.5;
                                    antiX -= 1.5;
                                    if (particleX >= midX - pR - 2) {
                                        state = 'annihilating';
                                        flashAlpha = 2.0;
                                        simTime = 0;
                                        // Create photons going in opposite directions
                                        photons = [
                                            { x: midX, y: centerY, vx: -3, vy: 0, phase: 0 },
                                            { x: midX, y: centerY, vx: 3, vy: 0, phase: Math.PI }
                                        ];
                                    }
                                }

                                if (state === 'annihilating') {
                                    flashAlpha *= 0.95;
                                    for (var i = 0; i < photons.length; i++) {
                                        photons[i].x += photons[i].vx;
                                    }
                                    if (flashAlpha < 0.05) {
                                        state = 'photons';
                                    }
                                }

                                if (state === 'photons') {
                                    for (var i = 0; i < photons.length; i++) {
                                        photons[i].x += photons[i].vx;
                                    }
                                }

                                // Flash
                                if (flashAlpha > 0.01) {
                                    ctx.save();
                                    ctx.globalAlpha = Math.min(flashAlpha, 1) * 0.7;
                                    var grad = ctx.createRadialGradient(midX, centerY, 0, midX, centerY, 150);
                                    grad.addColorStop(0, '#ffffff');
                                    grad.addColorStop(0.2, viz.colors.gold);
                                    grad.addColorStop(0.5, viz.colors.orange + '88');
                                    grad.addColorStop(1, 'transparent');
                                    ctx.fillStyle = grad;
                                    ctx.beginPath(); ctx.arc(midX, centerY, 150, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }

                                // Draw particles (before annihilation)
                                if (state === 'ready' || state === 'approaching') {
                                    // Electron
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.blue; ctx.shadowBlur = 15;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath(); ctx.arc(particleX, centerY, pR, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText('e\u207B', particleX, centerY);
                                    viz.screenText('electron', particleX, centerY + pR + 15, viz.colors.blue, 10);

                                    // Positron
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.red; ctx.shadowBlur = 15;
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath(); ctx.arc(antiX, centerY, pR, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.fillText('e\u207A', antiX, centerY);
                                    viz.screenText('positron', antiX, centerY + pR + 15, viz.colors.red, 10);

                                    if (state === 'approaching') {
                                        // Arrows
                                        viz.screenText('\u2192', particleX + pR + 15, centerY, viz.colors.blue, 18);
                                        viz.screenText('\u2190', antiX - pR - 15, centerY, viz.colors.red, 18);
                                    }
                                }

                                // Draw photons (wavy lines)
                                if (photons.length > 0 && (state === 'annihilating' || state === 'photons')) {
                                    for (var i = 0; i < photons.length; i++) {
                                        var ph = photons[i];
                                        if (ph.x < -50 || ph.x > w + 50) continue;

                                        ctx.save();
                                        ctx.strokeStyle = viz.colors.yellow;
                                        ctx.lineWidth = 2.5;
                                        ctx.shadowColor = viz.colors.yellow;
                                        ctx.shadowBlur = 8;
                                        ctx.beginPath();
                                        var waveLen = 30;
                                        var amp = 10;
                                        var dir = ph.vx > 0 ? 1 : -1;
                                        for (var ww = 0; ww < waveLen; ww++) {
                                            var wx = ph.x - dir * ww * 2;
                                            var wy = centerY + Math.sin(ww * 0.8 + t * 10 + ph.phase) * amp;
                                            if (ww === 0) ctx.moveTo(wx, wy); else ctx.lineTo(wx, wy);
                                        }
                                        ctx.stroke();
                                        ctx.restore();

                                        viz.screenText('\u03B3', ph.x + dir * 30, centerY - 25, viz.colors.yellow, 14);
                                    }
                                }

                                // Equation
                                viz.screenText('e\u207B + e\u207A \u2192 2\u03B3', midX, h * 0.72, viz.colors.white, 14);
                                viz.screenText('E = mc\u00B2: mass is completely converted to energy', midX, h * 0.72 + 22, viz.colors.gold, 11);

                                // Energy accounting
                                if (state === 'annihilating' || state === 'photons') {
                                    viz.screenText('2 \u00D7 0.511 MeV = 1.022 MeV of \u03B3-ray energy', midX, h * 0.72 + 44, viz.colors.text, 10);
                                }

                                // Status
                                var statusText = '';
                                if (state === 'ready') statusText = 'Press "Annihilate!" to begin';
                                else if (state === 'approaching') statusText = 'Particle and antiparticle approaching...';
                                else if (state === 'annihilating') statusText = 'ANNIHILATION! Mass converted to energy!';
                                else statusText = 'Two gamma-ray photons carry away all the energy';
                                viz.screenText(statusText, midX, 20, viz.colors.teal, 13);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'When an electron (mass 0.511 MeV/c\\(^2\\)) and a positron annihilate at rest, two gamma-ray photons are produced. What is the energy of each photon?',
                        hint: 'Total energy = total rest mass energy (since both particles are at rest). This energy is split equally between two photons.',
                        solution: 'Total mass energy: \\(2 \\times 0.511 = 1.022\\,\\text{MeV}\\). Each photon carries \\(1.022/2 = 0.511\\,\\text{MeV}\\). The photons travel in opposite directions to conserve momentum (which was zero before the annihilation).'
                    },
                    {
                        question: 'The Higgs boson has a mass of 125 GeV. How does this compare to the proton mass (0.938 GeV)? How many proton masses is one Higgs?',
                        hint: 'Simple division.',
                        solution: '\\(125 / 0.938 \\approx 133\\). The Higgs boson is about 133 times heavier than the proton. Despite its large mass, it decays almost instantly (lifetime \\(\\sim 10^{-22}\\) s) and must be produced in high-energy collisions at particle accelerators like the LHC.'
                    }
                ]
            }
        ]
    });
})();
