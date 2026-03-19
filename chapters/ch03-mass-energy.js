// === Chapter 3: E = mc² ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch03',
        number: 3,
        title: 'E = mc\u00B2',
        subtitle: 'The most famous equation in physics, and what it really means',
        file: 'ch03-mass-energy',

        sections: [
            // ============================================================
            // Section 0: Mass is Energy
            // ============================================================
            {
                id: 'mass-is-energy',
                title: 'Mass is Energy',
                content: `
<h2>The Equation That Changed the World</h2>

<p>In a short addendum to his 1905 relativity paper, Einstein showed that mass and energy are equivalent. An object at rest possesses energy simply by virtue of having mass:</p>

\\[E_0 = mc^2\\]

<div class="env-block definition">
<div class="env-title">Definition: Rest Energy</div>
<div class="env-body">
<p>The <strong>rest energy</strong> \\(E_0 = mc^2\\) is the energy contained in an object at rest, where \\(m\\) is its (invariant) mass. The factor \\(c^2 \\approx 9 \\times 10^{16}\\;\\text{m}^2/\\text{s}^2\\) is enormous, meaning a tiny amount of mass corresponds to a vast amount of energy.</p>
</div>
</div>

<p>The numbers are staggering. One kilogram of matter, if entirely converted to energy, yields:</p>

\\[E = 1 \\times (3 \\times 10^8)^2 = 9 \\times 10^{16}\\;\\text{J}\\]

<p>That is about 21.5 megatons of TNT, or roughly 1,500 Hiroshima bombs. Of course, we cannot (and should not) convert an entire kilogram to energy. But nature does convert small fractions of mass to energy in nuclear reactions and particle-antiparticle annihilation.</p>

<div class="env-block intuition">
<div class="env-title">Why is \\(c^2\\) so large?</div>
<div class="env-body">
<p>The speed of light squared is not a conversion factor we chose. It is a fundamental property of spacetime. The fact that \\(c\\) is so large in everyday units (meters and seconds) means that mass is an extremely concentrated form of energy. A single raisin contains enough rest energy to power a city for a day, if only we could unlock it.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Mass is not "converted" to energy</div>
<div class="env-body">
<p>A common misconception is that mass and energy are different things that can be converted into each other. More precisely, mass IS a form of energy. When we say "mass is converted to energy" in a nuclear reaction, we mean that rest energy (associated with mass) is transformed into kinetic energy, radiation, or other forms. Total energy is always conserved.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-mass-energy-converter"></div>
`,
                visualizations: [
                    {
                        id: 'viz-mass-energy-converter',
                        title: 'Mass-Energy Converter',
                        description: 'Enter a mass and see the equivalent energy expressed in everyday units. How many Hiroshima bombs? How many years of household power? The numbers are mind-boggling.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var massGrams = 1.0; // grams
                            var c2 = 9e16; // (m/s)^2

                            VizEngine.createSlider(controls, 'Mass (grams)', 0.001, 1000, massGrams, 0.001, function (v) { massGrams = v; });

                            // Preset buttons
                            var presets = [
                                { label: 'Grain of sand (0.001g)', val: 0.001 },
                                { label: 'Raisin (1g)', val: 1 },
                                { label: 'Apple (200g)', val: 200 },
                                { label: '1 kg', val: 1000 }
                            ];
                            for (var i = 0; i < presets.length; i++) {
                                (function (p) {
                                    VizEngine.createButton(controls, p.label, function () { massGrams = p.val; });
                                })(presets[i]);
                            }

                            function formatSci(num) {
                                if (num < 1000 && num >= 0.01) return num.toFixed(2);
                                var exp = Math.floor(Math.log10(Math.abs(num)));
                                var mantissa = num / Math.pow(10, exp);
                                return mantissa.toFixed(2) + ' \u00D7 10^' + exp;
                            }

                            function draw(t) {
                                viz.clear();

                                var massKg = massGrams / 1000;
                                var energy = massKg * c2; // Joules

                                var hiroshima = 6.3e13; // J per Hiroshima bomb
                                var tnt = 4.184e9; // J per ton TNT
                                var household = 1.05e10; // J per US household per year
                                var lightning = 1e9; // J per lightning bolt

                                var numHiroshima = energy / hiroshima;
                                var numTonsTNT = energy / tnt;
                                var numHouseholds = energy / household;
                                var numLightning = energy / lightning;

                                // Background: subtle energy glow
                                var pulse = 0.5 + 0.3 * Math.sin(t * 0.002);
                                var glowR = 50 + pulse * 30;
                                var centerGlow = ctx.createRadialGradient(w / 2, h * 0.25, 10, w / 2, h * 0.25, glowR);
                                centerGlow.addColorStop(0, 'rgba(255,200,50,' + (0.1 * pulse) + ')');
                                centerGlow.addColorStop(1, 'rgba(255,200,50,0)');
                                ctx.fillStyle = centerGlow;
                                ctx.beginPath();
                                ctx.arc(w / 2, h * 0.25, glowR, 0, Math.PI * 2);
                                ctx.fill();

                                // Mass display
                                var massStr;
                                if (massGrams >= 1) massStr = massGrams.toFixed(1) + ' g';
                                else massStr = (massGrams * 1000).toFixed(1) + ' mg';

                                viz.screenText('Mass: ' + massStr, w / 2, 28, viz.colors.white, 18, 'center');

                                // The equation
                                viz.screenText('E = mc\u00B2', w / 2, 58, viz.colors.gold, 22, 'center');

                                // Energy result
                                viz.screenText('Energy = ' + formatSci(energy) + ' J', w / 2, 92, viz.colors.cyan, 16, 'center');

                                // Comparison cards
                                var cardW = w * 0.42;
                                var cardH = 52;
                                var cardGap = 10;
                                var startY = 130;
                                var leftX = w * 0.04;
                                var rightX = w * 0.54;

                                var comparisons = [
                                    { label: 'Hiroshima bombs', value: numHiroshima, icon: '\u2622', color: viz.colors.red, x: leftX },
                                    { label: 'Tons of TNT', value: numTonsTNT, icon: '\u{1F4A5}', color: viz.colors.orange, x: rightX },
                                    { label: 'US households / year', value: numHouseholds, icon: '\u{1F3E0}', color: viz.colors.green, x: leftX },
                                    { label: 'Lightning bolts', value: numLightning, icon: '\u26A1', color: viz.colors.yellow, x: rightX }
                                ];

                                for (var i = 0; i < comparisons.length; i++) {
                                    var comp = comparisons[i];
                                    var row = Math.floor(i / 2);
                                    var cy = startY + row * (cardH + cardGap);

                                    // Card background
                                    ctx.fillStyle = '#0c0c20cc';
                                    ctx.strokeStyle = comp.color + '44';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.roundRect(comp.x, cy, cardW, cardH, 6);
                                    ctx.fill();
                                    ctx.stroke();

                                    // Accent bar
                                    ctx.fillStyle = comp.color + '44';
                                    ctx.beginPath();
                                    ctx.roundRect(comp.x, cy, 4, cardH, [6, 0, 0, 6]);
                                    ctx.fill();

                                    // Value
                                    viz.screenText(formatSci(comp.value), comp.x + cardW / 2, cy + 18, comp.color, 16, 'center');
                                    viz.screenText(comp.label, comp.x + cardW / 2, cy + 38, viz.colors.text, 10, 'center');
                                }

                                // Scale perspective
                                var perspY = startY + 2 * (cardH + cardGap) + 20;
                                ctx.fillStyle = '#0c0c20cc';
                                ctx.strokeStyle = viz.colors.purple + '33';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.roundRect(w * 0.05, perspY, w * 0.9, 55, 6);
                                ctx.fill();
                                ctx.stroke();

                                // Energy bar visualization
                                var barY = perspY + 12;
                                var barW = w * 0.75;
                                var barH = 14;
                                var barX = w * 0.12;

                                // Full bar = 1 kg worth
                                var maxE = 1000 / 1000 * c2; // 1000g = 1kg
                                var frac = VizEngine.clamp(energy / maxE, 0, 1);

                                ctx.fillStyle = '#1a1a40';
                                ctx.fillRect(barX, barY, barW, barH);
                                var barGrad = ctx.createLinearGradient(barX, 0, barX + barW * frac, 0);
                                barGrad.addColorStop(0, viz.colors.yellow);
                                barGrad.addColorStop(1, viz.colors.red);
                                ctx.fillStyle = barGrad;
                                ctx.fillRect(barX, barY, barW * frac, barH);
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 0.5;
                                ctx.strokeRect(barX, barY, barW, barH);

                                viz.screenText(massStr + ' out of 1 kg', w / 2, barY + barH + 16, viz.colors.text, 10, 'center');

                                // Footer
                                viz.screenText('c\u00B2 = 9 \u00D7 10\u00B9\u2076 m\u00B2/s\u00B2    |    Even a tiny mass stores enormous energy', w / 2, h - 14, viz.colors.text, 10, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'How much energy (in joules) is stored in the mass of a single proton? (Proton mass: \\(1.67 \\times 10^{-27}\\) kg.)',
                        hint: 'Just multiply by \\(c^2 = 9 \\times 10^{16}\\) m\\(^2\\)/s\\(^2\\).',
                        solution: '\\(E = mc^2 = 1.67 \\times 10^{-27} \\times 9 \\times 10^{16} = 1.50 \\times 10^{-10}\\) J \\(\\approx 938\\) MeV. This is the famous proton rest energy.'
                    },
                    {
                        question: 'A nuclear power plant generates \\(10^9\\) W (1 GW) of power. How much mass does it convert to energy per second?',
                        hint: 'Power is energy per time. Use \\(m = E/c^2\\).',
                        solution: '\\(m = P \\cdot t / c^2 = 10^9 / (9 \\times 10^{16}) \\approx 1.1 \\times 10^{-8}\\) kg = 11 micrograms per second. That is a tiny amount of mass, but it generates a billion watts.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Relativistic Momentum
            // ============================================================
            {
                id: 'relativistic-momentum',
                title: 'Relativistic Momentum',
                content: `
<h2>Why You Cannot Reach the Speed of Light</h2>

<p>In Newtonian mechanics, momentum is \\(p = mv\\). Apply a force, the object accelerates; keep pushing, and it goes as fast as you like. This breaks down at high speeds.</p>

<div class="env-block definition">
<div class="env-title">Definition: Relativistic Momentum</div>
<div class="env-body">
<p>The relativistic momentum of a particle with mass \\(m\\) moving at speed \\(v\\) is:</p>
\\[p = \\gamma m v = \\frac{mv}{\\sqrt{1 - v^2/c^2}}\\]
<p>This reduces to \\(mv\\) at low speeds but diverges to infinity as \\(v \\to c\\).</p>
</div>
</div>

<p>The implications are profound:</p>
<ul>
<li>At low speed: \\(\\gamma \\approx 1\\), so \\(p \\approx mv\\). Newton is fine.</li>
<li>At \\(v = 0.9c\\): \\(\\gamma \\approx 2.3\\), so the momentum is 2.3 times what Newton would predict.</li>
<li>As \\(v \\to c\\): \\(\\gamma \\to \\infty\\), so \\(p \\to \\infty\\). It takes infinite momentum (and therefore infinite energy) to accelerate a massive particle to the speed of light.</li>
</ul>

<div class="env-block intuition">
<div class="env-title">What does this feel like?</div>
<div class="env-body">
<p>Imagine pushing a sled on ice. At first, each push gives a noticeable speed increase. As the sled approaches \\(c\\), the same push produces a smaller and smaller speed increase. It feels as though the sled is getting heavier and heavier. In the old language, this was called "relativistic mass," but modern physics prefers to say the mass is constant and the inertia (resistance to acceleration) increases through \\(\\gamma\\).</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Avoid "relativistic mass"</div>
<div class="env-body">
<p>Older textbooks define \\(m_{\\text{rel}} = \\gamma m\\) and then write \\(p = m_{\\text{rel}} v\\). Modern physics discourages this. The mass \\(m\\) of a particle is a Lorentz invariant (the same in all frames). What increases is the momentum and energy, not the mass. The "heavy at high speed" language is misleading because it suggests mass changes, when in fact it is the relationship between force and acceleration that changes.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-rel-momentum"></div>
`,
                visualizations: [
                    {
                        id: 'viz-rel-momentum',
                        title: 'Relativistic vs. Newtonian Momentum',
                        description: 'Compare \\(p = mv\\) (Newtonian, dashed) with \\(p = \\gamma mv\\) (relativistic, solid). As \\(v \\to c\\), relativistic momentum diverges to infinity while Newtonian momentum stays finite. This is why no massive object can reach \\(c\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var currentBeta = 0.5;

                            VizEngine.createSlider(controls, 'v / c', 0, 0.99, currentBeta, 0.01, function (v) { currentBeta = v; });

                            function gammaOf(b) { return b >= 1 ? 100 : 1 / Math.sqrt(1 - b * b); }

                            function draw(t) {
                                viz.clear();

                                // Plot area
                                var ox = 80, oy = h - 50;
                                var plotW = w - 120, plotH = h - 90;
                                var maxBeta = 1.0;
                                var maxP = 8; // in units of mc

                                function toX(b) { return ox + (b / maxBeta) * plotW; }
                                function toY(p) { return oy - (p / maxP) * plotH; }

                                // Grid
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                for (var b = 0; b <= 1.0; b += 0.1) {
                                    ctx.beginPath(); ctx.moveTo(toX(b), oy); ctx.lineTo(toX(b), oy - plotH); ctx.stroke();
                                }
                                for (var p = 0; p <= maxP; p += 1) {
                                    ctx.beginPath(); ctx.moveTo(ox, toY(p)); ctx.lineTo(ox + plotW, toY(p)); ctx.stroke();
                                }

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + plotW, oy); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, oy - plotH); ctx.stroke();

                                // Tick labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                for (var b = 0; b <= 1.0; b += 0.2) {
                                    ctx.fillText(b.toFixed(1), toX(b), oy + 5);
                                }
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                for (var p = 0; p <= maxP; p += 1) {
                                    ctx.fillText(p, ox - 6, toY(p));
                                }

                                // Axis labels
                                ctx.font = 'italic 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('v / c', ox + plotW / 2, oy + 28);
                                ctx.save();
                                ctx.translate(16, oy - plotH / 2);
                                ctx.rotate(-Math.PI / 2);
                                ctx.textBaseline = 'middle';
                                ctx.fillText('p / mc', 0, 0);
                                ctx.restore();

                                // Asymptote at v = c
                                ctx.strokeStyle = viz.colors.red + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([5, 5]);
                                ctx.beginPath(); ctx.moveTo(toX(1), oy); ctx.lineTo(toX(1), oy - plotH); ctx.stroke();
                                ctx.setLineDash([]);

                                // Newtonian curve (dashed): p = mv = m*beta*c, so p/mc = beta
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                ctx.moveTo(toX(0), toY(0));
                                ctx.lineTo(toX(1), toY(1));
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('Newtonian (p = mv)', toX(0.7) + 5, toY(0.7) - 15, viz.colors.text, 10, 'left');

                                // Relativistic curve: p/mc = gamma*beta
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 500; i++) {
                                    var bv = i / 500 * 0.999;
                                    var pv = gammaOf(bv) * bv;
                                    if (pv > maxP + 1) break;
                                    var px = toX(bv), py = toY(pv);
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Glow
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 8;
                                ctx.strokeStyle = viz.colors.cyan + '44';
                                ctx.lineWidth = 6;
                                ctx.beginPath();
                                started = false;
                                for (var i = 0; i <= 500; i++) {
                                    var bv = i / 500 * 0.999;
                                    var pv = gammaOf(bv) * bv;
                                    if (pv > maxP + 1) break;
                                    var px = toX(bv), py = toY(pv);
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                ctx.restore();

                                viz.screenText('Relativistic (p = \u03B3mv)', toX(0.5), toY(gammaOf(0.5) * 0.5) - 18, viz.colors.cyan, 10, 'center');

                                // Current point
                                var gamma = gammaOf(currentBeta);
                                var relP = gamma * currentBeta;
                                var newtonP = currentBeta;

                                if (relP <= maxP) {
                                    var cpx = toX(currentBeta);

                                    // Relativistic point
                                    var cpy = toY(relP);
                                    ctx.strokeStyle = viz.colors.yellow + '66';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(cpx, cpy); ctx.lineTo(cpx, oy); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(cpx, cpy); ctx.lineTo(ox, cpy); ctx.stroke();
                                    ctx.setLineDash([]);

                                    var dotGrad = ctx.createRadialGradient(cpx, cpy, 2, cpx, cpy, 12);
                                    dotGrad.addColorStop(0, viz.colors.yellow);
                                    dotGrad.addColorStop(1, viz.colors.yellow + '00');
                                    ctx.fillStyle = dotGrad;
                                    ctx.beginPath(); ctx.arc(cpx, cpy, 12, 0, Math.PI * 2); ctx.fill();
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath(); ctx.arc(cpx, cpy, 5, 0, Math.PI * 2); ctx.fill();

                                    // Newtonian point
                                    var npY = toY(newtonP);
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.beginPath(); ctx.arc(cpx, npY, 4, 0, Math.PI * 2); ctx.fill();

                                    // Gap arrow between them
                                    if (Math.abs(cpy - npY) > 15) {
                                        ctx.strokeStyle = viz.colors.red + '88';
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        ctx.moveTo(cpx + 12, npY);
                                        ctx.lineTo(cpx + 12, cpy);
                                        ctx.stroke();
                                        var ratio = (relP / newtonP).toFixed(2);
                                        viz.screenText('\u00D7' + ratio, cpx + 25, (cpy + npY) / 2, viz.colors.red, 10, 'left', 'middle');
                                    }
                                }

                                // Info
                                viz.screenText('v = ' + currentBeta.toFixed(2) + 'c    \u03B3 = ' + gamma.toFixed(3) + '    p(rel)/p(Newton) = ' + gamma.toFixed(3), w / 2, h - 12, viz.colors.white, 11, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'At what speed is the relativistic momentum twice the Newtonian momentum?',
                        hint: 'Set \\(\\gamma mv = 2mv\\) and solve for \\(v\\).',
                        solution: '\\(\\gamma = 2\\), so \\(1/\\sqrt{1 - v^2/c^2} = 2\\), giving \\(v^2/c^2 = 3/4\\), hence \\(v = (\\sqrt{3}/2)c \\approx 0.866c\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: The Full Equation
            // ============================================================
            {
                id: 'full-equation',
                title: 'The Full Equation',
                content: `
<h2>The Equation Einstein Actually Wrote</h2>

<p>\\(E = mc^2\\) is only part of the story. It gives the energy of a particle <em>at rest</em>. The full relativistic energy-momentum relation is:</p>

<div class="env-block theorem">
<div class="env-title">The Energy-Momentum Relation</div>
<div class="env-body">
\\[E^2 = (pc)^2 + (mc^2)^2\\]
<p>where \\(E\\) is the total energy, \\(p\\) is the relativistic momentum, and \\(m\\) is the invariant (rest) mass.</p>
</div>
</div>

<p>This is a Pythagorean relation in energy-momentum space. Think of it as a right triangle:</p>
<ul>
<li>Hypotenuse: total energy \\(E\\)</li>
<li>One leg: momentum term \\(pc\\)</li>
<li>Other leg: rest energy \\(mc^2\\)</li>
</ul>

<div class="env-block remark">
<div class="env-title">Special cases</div>
<div class="env-body">
<p><strong>Particle at rest</strong> (\\(p = 0\\)): \\(E = mc^2\\). We recover the famous equation.</p>
<p><strong>Massless particle</strong> (\\(m = 0\\), like a photon): \\(E = pc\\). Photons have momentum despite having no mass, and their energy is entirely kinetic.</p>
</div>
</div>

<p>The total energy of a moving particle can also be written as:</p>

\\[E = \\gamma mc^2\\]

<p>The kinetic energy is the total energy minus the rest energy:</p>

\\[K = E - mc^2 = (\\gamma - 1)mc^2\\]

<div class="env-block example">
<div class="env-title">Example: Kinetic Energy at High Speed</div>
<div class="env-body">
<p>A proton (\\(m = 1.67 \\times 10^{-27}\\) kg) moves at \\(0.99c\\). Its kinetic energy is:</p>
\\[K = (\\gamma - 1)mc^2 = (7.09 - 1)(1.67 \\times 10^{-27})(9 \\times 10^{16}) \\approx 9.15 \\times 10^{-10}\\;\\text{J} \\approx 5710\\;\\text{MeV}\\]
<p>This is about 6 times its rest energy of 938 MeV. At this speed, most of the proton's energy is kinetic.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">The Newtonian formula is wrong at high speeds</div>
<div class="env-body">
<p>The Newtonian kinetic energy \\(K = \\frac{1}{2}mv^2\\) is a low-speed approximation. Using a Taylor expansion of \\(\\gamma\\):</p>
\\[\\gamma \\approx 1 + \\frac{1}{2}\\frac{v^2}{c^2} + \\frac{3}{8}\\frac{v^4}{c^4} + \\cdots\\]
<p>So \\(K \\approx \\frac{1}{2}mv^2 + \\frac{3}{8}m\\frac{v^4}{c^2} + \\cdots\\). The first term is Newton's formula; the rest are relativistic corrections.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A photon has energy 2 eV. What is its momentum? (Use \\(E = pc\\) and \\(c = 3 \\times 10^8\\) m/s, \\(1\\;\\text{eV} = 1.6 \\times 10^{-19}\\) J.)',
                        hint: 'For a massless particle, \\(p = E/c\\).',
                        solution: '\\(E = 2 \\times 1.6 \\times 10^{-19} = 3.2 \\times 10^{-19}\\) J. \\(p = E/c = 3.2 \\times 10^{-19} / 3 \\times 10^8 = 1.07 \\times 10^{-27}\\) kg m/s.'
                    },
                    {
                        question: 'Show that the Newtonian kinetic energy \\(K = \\frac{1}{2}mv^2\\) is the low-speed limit of the relativistic expression \\(K = (\\gamma - 1)mc^2\\).',
                        hint: 'Use the binomial expansion of \\(\\gamma\\) for small \\(v/c\\).',
                        solution: "\\\\(\\\\gamma = (1 - v^2/c^2)^{-1/2} \\\\approx 1 + \\\\frac{1}{2}v^2/c^2\\\\) for \\\\(v \\\\ll c\\\\). Then \\\\(K = (\\\\gamma - 1)mc^2 \\\\approx \\\\frac{1}{2}(v^2/c^2)mc^2 = \\\\frac{1}{2}mv^2\\\\). This confirms Newton's formula is the low-speed approximation."
                    }
                ]
            },

            // ============================================================
            // Section 3: Nuclear Energy
            // ============================================================
            {
                id: 'nuclear-energy',
                title: 'Nuclear Energy',
                content: `
<h2>Where \\(E = mc^2\\) Becomes Practical</h2>

<p>In chemical reactions (burning wood, digesting food), energy is released by rearranging electron bonds. The mass change is real but absurdly tiny: about \\(10^{-9}\\) of the total mass. It is utterly undetectable.</p>

<p>In nuclear reactions, the mass change is roughly a million times larger: about \\(10^{-3}\\) (0.1%) of the total mass. This is measurable and produces enormous energy.</p>

<div class="env-block definition">
<div class="env-title">Definition: Nuclear Fission</div>
<div class="env-body">
<p><strong>Nuclear fission</strong> is the splitting of a heavy nucleus (e.g., uranium-235) into two lighter nuclei, releasing energy. The total mass of the products is slightly less than the original nucleus, and the "missing" mass appears as kinetic energy of the fragments and radiation.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Nuclear Fusion</div>
<div class="env-body">
<p><strong>Nuclear fusion</strong> is the combining of light nuclei (e.g., hydrogen isotopes) into a heavier nucleus, releasing energy. The Sun is powered by fusion: four protons fuse into a helium-4 nucleus, with 0.7% of the mass converted to energy.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: The Sun's Power</div>
<div class="env-body">
<p>The Sun radiates \\(3.8 \\times 10^{26}\\) W. This requires converting mass to energy at a rate of:</p>
\\[\\frac{dm}{dt} = \\frac{P}{c^2} = \\frac{3.8 \\times 10^{26}}{9 \\times 10^{16}} \\approx 4.2 \\times 10^9\\;\\text{kg/s}\\]
<p>The Sun loses about 4.2 million tonnes of mass every second. Over its 4.6-billion-year history, it has lost only about 0.03% of its mass.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Fission vs. fusion</div>
<div class="env-body">
<p>Fission releases about 0.1% of the fuel mass as energy. Fusion releases about 0.7%. Matter-antimatter annihilation releases 100% (all mass becomes energy). Current nuclear power plants use fission. Practical fusion power remains an engineering challenge.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'In the fission of one uranium-235 nucleus, about 200 MeV of energy is released. What fraction of the uranium mass is converted to energy? (U-235 mass: \\(3.9 \\times 10^{-25}\\) kg.)',
                        hint: 'Convert 200 MeV to joules, then compute \\(\\Delta m = E/c^2\\), and find \\(\\Delta m / m\\).',
                        solution: '\\(200\\;\\text{MeV} = 200 \\times 1.6 \\times 10^{-13} = 3.2 \\times 10^{-11}\\) J. \\(\\Delta m = 3.2 \\times 10^{-11} / 9 \\times 10^{16} = 3.56 \\times 10^{-28}\\) kg. Fraction: \\(3.56 \\times 10^{-28} / 3.9 \\times 10^{-25} \\approx 9.1 \\times 10^{-4} \\approx 0.091\\%\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Mass Defect and the Binding Energy Curve
            // ============================================================
            {
                id: 'mass-defect',
                title: 'Mass Defect',
                content: `
<h2>Why Nuclei Weigh Less Than Their Parts</h2>

<p>When protons and neutrons bind together to form a nucleus, the nucleus weighs less than the sum of its individual protons and neutrons. This "missing mass" is called the <strong>mass defect</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Mass Defect</div>
<div class="env-body">
<p>The <strong>mass defect</strong> \\(\\Delta m\\) of a nucleus is the difference between the total mass of the individual nucleons and the actual nuclear mass:</p>
\\[\\Delta m = Z m_p + N m_n - M_{\\text{nucleus}}\\]
<p>where \\(Z\\) is the number of protons, \\(N\\) is the number of neutrons, \\(m_p\\) and \\(m_n\\) are the proton and neutron masses, and \\(M_{\\text{nucleus}}\\) is the measured nuclear mass.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Binding Energy</div>
<div class="env-body">
<p>The <strong>binding energy</strong> \\(B\\) of a nucleus is the energy equivalent of the mass defect:</p>
\\[B = \\Delta m \\cdot c^2\\]
<p>It is the energy required to completely disassemble the nucleus into individual protons and neutrons. Higher binding energy per nucleon means a more stable nucleus.</p>
</div>
</div>

<p>The <strong>binding energy per nucleon</strong>, \\(B/A\\) (where \\(A = Z + N\\) is the mass number), varies across the periodic table in a famous curve.</p>

<div class="env-block theorem">
<div class="env-title">The Binding Energy Curve</div>
<div class="env-body">
<p>Binding energy per nucleon rises steeply for light nuclei, peaks near <strong>iron-56</strong> and <strong>nickel-62</strong> (about 8.8 MeV/nucleon), then slowly decreases for heavier nuclei.</p>
<ul>
<li><strong>Fusion</strong> releases energy by combining light nuclei (moving uphill toward the peak from the left).</li>
<li><strong>Fission</strong> releases energy by splitting heavy nuclei (moving downhill toward the peak from the right).</li>
<li>Iron is at the top: it is the most tightly bound nucleus. You cannot extract nuclear energy from iron.</li>
</ul>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why iron is special</div>
<div class="env-body">
<p>Stars fuse lighter elements into heavier ones, releasing energy at each step. But when a massive star's core becomes iron, fusion no longer releases energy (you would have to <em>add</em> energy to fuse iron into something heavier). The core collapses, triggering a supernova. This is why iron is so abundant in the universe and why stellar evolution has a natural endpoint.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-binding-energy"></div>
`,
                visualizations: [
                    {
                        id: 'viz-binding-energy',
                        title: 'Binding Energy per Nucleon Curve',
                        description: 'The famous curve showing how tightly nucleons are bound in each element. Iron sits at the peak. Fusion climbs up from the left (light nuclei); fission slides down from the right (heavy nuclei). Hover over elements to see their values.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Binding energy data: [A (mass number), B/A (MeV), symbol, name]
                            var data = [
                                [1, 0, 'H', 'Hydrogen'],
                                [2, 1.112, 'D', 'Deuterium'],
                                [3, 2.827, 'He-3', 'Helium-3'],
                                [4, 7.074, 'He-4', 'Helium-4'],
                                [6, 5.333, 'Li-6', 'Lithium-6'],
                                [7, 5.606, 'Li-7', 'Lithium-7'],
                                [9, 6.463, 'Be-9', 'Beryllium-9'],
                                [10, 6.475, 'B-10', 'Boron-10'],
                                [12, 7.680, 'C-12', 'Carbon-12'],
                                [14, 7.476, 'N-14', 'Nitrogen-14'],
                                [16, 7.976, 'O-16', 'Oxygen-16'],
                                [20, 8.032, 'Ne', 'Neon-20'],
                                [24, 8.261, 'Mg', 'Magnesium-24'],
                                [27, 8.332, 'Al', 'Aluminum-27'],
                                [28, 8.448, 'Si', 'Silicon-28'],
                                [32, 8.493, 'S', 'Sulfur-32'],
                                [40, 8.551, 'Ca', 'Calcium-40'],
                                [48, 8.667, 'Ti', 'Titanium-48'],
                                [52, 8.609, 'Cr', 'Chromium-52'],
                                [56, 8.790, 'Fe', 'Iron-56'],
                                [58, 8.732, 'Ni', 'Nickel-58'],
                                [62, 8.795, 'Ni-62', 'Nickel-62'],
                                [64, 8.777, 'Zn', 'Zinc-64'],
                                [75, 8.639, 'As', 'Arsenic-75'],
                                [90, 8.693, 'Zr', 'Zirconium-90'],
                                [107, 8.554, 'Ag', 'Silver-107'],
                                [120, 8.505, 'Sn', 'Tin-120'],
                                [141, 8.355, 'Pr', 'Praseodymium'],
                                [150, 8.294, 'Nd', 'Neodymium-150'],
                                [175, 8.151, 'Lu', 'Lutetium'],
                                [197, 7.916, 'Au', 'Gold-197'],
                                [208, 7.867, 'Pb', 'Lead-208'],
                                [209, 7.848, 'Bi', 'Bismuth-209'],
                                [235, 7.591, 'U-235', 'Uranium-235'],
                                [238, 7.570, 'U-238', 'Uranium-238']
                            ];

                            var hoverIdx = -1;
                            viz.canvas.addEventListener('mousemove', function (e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                hoverIdx = -1;
                                for (var i = 0; i < data.length; i++) {
                                    var a = data[i][0], ba = data[i][1];
                                    var px = toX(a), py = toY(ba);
                                    if (Math.abs(mx - px) < 10 && Math.abs(my - py) < 10) {
                                        hoverIdx = i;
                                        break;
                                    }
                                }
                            });

                            // Plot dimensions
                            var ox = 65, oy = h - 50;
                            var plotW = w - 100, plotH = h - 90;
                            var maxA = 250, maxBA = 10;

                            function toX(a) { return ox + (a / maxA) * plotW; }
                            function toY(ba) { return oy - (ba / maxBA) * plotH; }

                            function draw(t) {
                                viz.clear();

                                // Grid
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                for (var a = 0; a <= maxA; a += 50) {
                                    ctx.beginPath(); ctx.moveTo(toX(a), oy); ctx.lineTo(toX(a), oy - plotH); ctx.stroke();
                                }
                                for (var ba = 0; ba <= maxBA; ba += 1) {
                                    ctx.beginPath(); ctx.moveTo(ox, toY(ba)); ctx.lineTo(ox + plotW, toY(ba)); ctx.stroke();
                                }

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + plotW, oy); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, oy - plotH); ctx.stroke();

                                // Tick labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                for (var a = 0; a <= maxA; a += 50) {
                                    ctx.fillText(a, toX(a), oy + 5);
                                }
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                for (var ba = 0; ba <= maxBA; ba += 2) {
                                    ctx.fillText(ba, ox - 6, toY(ba));
                                }

                                // Axis labels
                                ctx.font = 'italic 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Mass number A', ox + plotW / 2, oy + 28);
                                ctx.save();
                                ctx.translate(14, oy - plotH / 2);
                                ctx.rotate(-Math.PI / 2);
                                ctx.textBaseline = 'middle';
                                ctx.fillText('B/A (MeV/nucleon)', 0, 0);
                                ctx.restore();

                                // Fusion region
                                ctx.fillStyle = 'rgba(88,166,255,0.06)';
                                ctx.fillRect(ox, oy - plotH, toX(56) - ox, plotH);
                                viz.screenText('FUSION', (ox + toX(56)) / 2, oy - plotH + 16, viz.colors.blue + '88', 11, 'center');
                                // Arrow
                                ctx.strokeStyle = viz.colors.blue + '44';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(ox + 20, oy - plotH + 30);
                                ctx.lineTo(toX(56) - 20, oy - plotH + 30);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(toX(56) - 28, oy - plotH + 26);
                                ctx.lineTo(toX(56) - 20, oy - plotH + 30);
                                ctx.lineTo(toX(56) - 28, oy - plotH + 34);
                                ctx.stroke();

                                // Fission region
                                ctx.fillStyle = 'rgba(248,81,73,0.05)';
                                ctx.fillRect(toX(56), oy - plotH, ox + plotW - toX(56), plotH);
                                viz.screenText('FISSION', (toX(56) + ox + plotW) / 2, oy - plotH + 16, viz.colors.red + '88', 11, 'center');
                                ctx.strokeStyle = viz.colors.red + '44';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(ox + plotW - 20, oy - plotH + 30);
                                ctx.lineTo(toX(56) + 20, oy - plotH + 30);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(toX(56) + 28, oy - plotH + 26);
                                ctx.lineTo(toX(56) + 20, oy - plotH + 30);
                                ctx.lineTo(toX(56) + 28, oy - plotH + 34);
                                ctx.stroke();

                                // Data curve
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var i = 0; i < data.length; i++) {
                                    var px = toX(data[i][0]), py = toY(data[i][1]);
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Glow
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 6;
                                ctx.strokeStyle = viz.colors.gold + '33';
                                ctx.lineWidth = 6;
                                ctx.beginPath();
                                for (var i = 0; i < data.length; i++) {
                                    var px = toX(data[i][0]), py = toY(data[i][1]);
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                ctx.restore();

                                // Data points
                                for (var i = 0; i < data.length; i++) {
                                    var d = data[i];
                                    var px = toX(d[0]), py = toY(d[1]);
                                    var isHover = (i === hoverIdx);
                                    var isIron = (d[2] === 'Fe' || d[2] === 'Ni-62');

                                    var ptR = isHover ? 6 : (isIron ? 5 : 3.5);
                                    var ptColor = isIron ? viz.colors.gold : viz.colors.cyan;

                                    if (isHover) {
                                        var hGrad = ctx.createRadialGradient(px, py, 2, px, py, 14);
                                        hGrad.addColorStop(0, ptColor);
                                        hGrad.addColorStop(1, ptColor + '00');
                                        ctx.fillStyle = hGrad;
                                        ctx.beginPath(); ctx.arc(px, py, 14, 0, Math.PI * 2); ctx.fill();
                                    }

                                    ctx.fillStyle = ptColor;
                                    ctx.beginPath();
                                    ctx.arc(px, py, ptR, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Label key elements
                                    if (isIron || d[2] === 'He-4' || d[2] === 'C-12' || d[2] === 'U-235' || d[2] === 'H' || d[2] === 'D' || d[2] === 'O-16' || isHover) {
                                        var labelY = py - 12;
                                        if (d[0] < 10) labelY = py + 16;
                                        viz.screenText(d[2], px, labelY, isIron ? viz.colors.gold : viz.colors.white, isHover ? 12 : 9, 'center');
                                    }
                                }

                                // Iron peak annotation
                                var ironX = toX(56);
                                var ironY = toY(8.79);
                                ctx.strokeStyle = viz.colors.gold + '88';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath(); ctx.moveTo(ironX, ironY); ctx.lineTo(ironX, oy); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('Iron peak (most stable)', ironX, ironY - 22, viz.colors.gold, 10, 'center');

                                // Hover info box
                                if (hoverIdx >= 0) {
                                    var d = data[hoverIdx];
                                    var info = d[3] + ' (A=' + d[0] + ')  B/A = ' + d[1].toFixed(3) + ' MeV';
                                    viz.screenText(info, w / 2, h - 12, viz.colors.white, 12, 'center');
                                } else {
                                    viz.screenText('Hover over points to see element data', w / 2, h - 12, viz.colors.text, 10, 'center');
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Helium-4 has a binding energy of about 28.3 MeV total (4 nucleons, so 7.07 MeV/nucleon). Four free protons have zero binding energy. If 4 protons fuse into He-4 (via intermediate steps), how much energy is released per fusion event?',
                        hint: 'The energy released equals the binding energy gained, since the free protons start with B = 0.',
                        solution: 'Energy released = 28.3 MeV. (In practice, two of the protons convert to neutrons via the weak force, and the exact chain releases about 26.7 MeV as kinetic energy plus neutrinos. The 28.3 MeV figure counts the total binding.)'
                    },
                    {
                        question: 'Why can you not extract energy by fusing two iron nuclei?',
                        hint: 'Look at the binding energy curve near iron.',
                        solution: 'Iron-56 is at or near the peak of the binding energy per nucleon curve. Fusing two iron nuclei would produce a heavier nucleus with lower binding energy per nucleon, meaning the product is less stable. This reaction would require energy input rather than releasing energy. Iron is the "ash" of stellar fusion.'
                    }
                ]
            }
        ]
    });
})();
