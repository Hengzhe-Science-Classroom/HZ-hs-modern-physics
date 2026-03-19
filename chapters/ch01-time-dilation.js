// === Chapter 1: Time Dilation ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch01',
        number: 1,
        title: 'Time Dilation',
        subtitle: 'Moving clocks tick slower, and the universe means it',
        file: 'ch01-time-dilation',

        sections: [
            // ============================================================
            // Section 0: Moving Clocks Run Slow
            // ============================================================
            {
                id: 'moving-clocks',
                title: 'Moving Clocks Run Slow',
                content: `
<h2>The Most Astonishing Prediction</h2>

<p>Einstein's postulates lead to an inescapable conclusion: a clock that moves relative to you ticks more slowly than a clock at rest beside you. This is not a mechanical defect or an illusion. It is a fundamental property of time itself.</p>

<div class="env-block definition">
<div class="env-title">Definition: Time Dilation</div>
<div class="env-body">
<p><strong>Time dilation</strong> is the phenomenon whereby a clock moving relative to an observer ticks more slowly than a clock at rest in the observer's frame. If a time interval \\(\\Delta t_0\\) passes on the moving clock (its <em>proper time</em>), the observer measures a longer interval:</p>
\\[\\Delta t = \\gamma \\, \\Delta t_0\\]
<p>where \\(\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}} \\geq 1\\).</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Proper Time</div>
<div class="env-body">
<p><strong>Proper time</strong> \\(\\Delta t_0\\) is the time interval measured by a clock that is <em>present at both events</em>, i.e., a clock at rest in the frame where the two events happen at the same location. It is always the shortest time interval any observer can measure between those events.</p>
</div>
</div>

<p>Consider an astronaut on a spaceship moving at \\(0.8c\\). For every 1 second that passes on the astronaut's wristwatch, an observer on Earth measures:</p>

\\[\\gamma = \\frac{1}{\\sqrt{1 - 0.64}} = \\frac{1}{\\sqrt{0.36}} = \\frac{1}{0.6} = \\frac{5}{3} \\approx 1.667\\]

<p>So Earth-bound clocks register \\(1.667\\) seconds for every 1 second on the ship. The astronaut ages more slowly.</p>

<div class="env-block warning">
<div class="env-title">It goes both ways</div>
<div class="env-body">
<p>From the astronaut's perspective, it is the Earth clock that moves and therefore ticks slowly. This is not a contradiction: both frames are equally valid for inertial motion. The apparent paradox is resolved when acceleration is involved (see the twin paradox section below).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why doesn't this violate common sense?</div>
<div class="env-body">
<p>At everyday speeds (cars, planes, even rockets), \\(v/c\\) is tiny, so \\(\\gamma\\) is practically 1.000... The effect is there but unmeasurably small. It only becomes dramatic as \\(v\\) approaches \\(c\\). At \\(v = 0.99c\\), \\(\\gamma \\approx 7.09\\): the moving clock runs about 7 times slower.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: "A spaceship travels at \\\\(0.6c\\\\). For every 10 seconds measured on the ship's clock, how many seconds pass on Earth?",
                        hint: 'First compute \\(\\gamma\\) for \\(v = 0.6c\\).',
                        solution: '\\(\\gamma = 1/\\sqrt{1 - 0.36} = 1/\\sqrt{0.64} = 1/0.8 = 1.25\\). The Earth clock reads \\(\\Delta t = \\gamma \\Delta t_0 = 1.25 \\times 10 = 12.5\\) seconds.'
                    },
                    {
                        question: 'At what speed does a moving clock tick at half the rate of a stationary clock?',
                        hint: 'Set \\(\\gamma = 2\\) and solve for \\(v\\).',
                        solution: '\\(\\gamma = 2\\) means \\(1/\\sqrt{1 - v^2/c^2} = 2\\), so \\(1 - v^2/c^2 = 1/4\\), giving \\(v^2/c^2 = 3/4\\), hence \\(v = \\frac{\\sqrt{3}}{2}c \\approx 0.866c\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Gamma Factor
            // ============================================================
            {
                id: 'gamma-factor',
                title: 'The Gamma Factor',
                content: `
<h2>The Master Equation of Special Relativity</h2>

<p>The Lorentz factor \\(\\gamma\\) appears in virtually every equation of special relativity. Let us study it carefully.</p>

<div class="env-block definition">
<div class="env-title">Definition: Lorentz Factor</div>
<div class="env-body">
\\[\\gamma = \\frac{1}{\\sqrt{1 - \\beta^2}} \\quad \\text{where} \\quad \\beta = \\frac{v}{c}\\]
</div>
</div>

<p>Key properties:</p>
<ul>
<li>At \\(v = 0\\): \\(\\gamma = 1\\). No relativistic effects.</li>
<li>As \\(v \\to c\\): \\(\\gamma \\to \\infty\\). Effects become arbitrarily large.</li>
<li>\\(\\gamma\\) is always \\(\\geq 1\\) for \\(0 \\leq v < c\\).</li>
<li>For small \\(v/c\\), the binomial approximation gives \\(\\gamma \\approx 1 + \\frac{1}{2}\\frac{v^2}{c^2}\\).</li>
</ul>

<div class="env-block example">
<div class="env-title">Example: Some Important Values</div>
<div class="env-body">
<table style="margin:0 auto;border-collapse:collapse;">
<tr><th style="padding:4px 12px;border-bottom:1px solid #4a4a7a;">\\(v/c\\)</th><th style="padding:4px 12px;border-bottom:1px solid #4a4a7a;">\\(\\gamma\\)</th></tr>
<tr><td style="padding:4px 12px;">0.10</td><td style="padding:4px 12px;">1.005</td></tr>
<tr><td style="padding:4px 12px;">0.50</td><td style="padding:4px 12px;">1.155</td></tr>
<tr><td style="padding:4px 12px;">0.80</td><td style="padding:4px 12px;">1.667</td></tr>
<tr><td style="padding:4px 12px;">0.90</td><td style="padding:4px 12px;">2.294</td></tr>
<tr><td style="padding:4px 12px;">0.95</td><td style="padding:4px 12px;">3.203</td></tr>
<tr><td style="padding:4px 12px;">0.99</td><td style="padding:4px 12px;">7.089</td></tr>
<tr><td style="padding:4px 12px;">0.999</td><td style="padding:4px 12px;">22.37</td></tr>
</table>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The graph tells the story</div>
<div class="env-body">
<p>\\(\\gamma\\) is nearly flat for \\(v/c < 0.5\\), then rises sharply, shooting toward infinity as \\(v \\to c\\). This is why relativity is irrelevant for everyday life but dominates particle physics, where particles routinely travel at \\(0.999c\\) or faster.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-gamma-graph"></div>
`,
                visualizations: [
                    {
                        id: 'viz-gamma-graph',
                        title: 'The Lorentz Factor: gamma vs v/c',
                        description: 'The curve of \\(\\gamma = 1/\\sqrt{1 - v^2/c^2}\\). Drag the speed slider and watch \\(\\gamma\\) explode as \\(v \\to c\\). The vertical asymptote at \\(v = c\\) means you can never reach the speed of light.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, {
                                scale: 40,
                                originX: 70,
                                originY: undefined
                            });
                            viz.originY = viz.height - 50;
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var beta = 0.5;

                            VizEngine.createSlider(controls, 'v / c', 0, 0.99, beta, 0.01, function (v) { beta = v; });

                            function gammaOf(b) {
                                if (b >= 1) return Infinity;
                                return 1 / Math.sqrt(1 - b * b);
                            }

                            function draw() {
                                viz.clear();

                                // Custom grid and axes for this plot
                                var ox = 70, oy = h - 50;
                                var plotW = w - 100, plotH = h - 80;
                                var maxBeta = 1.0, maxGamma = 10;

                                function toPlotX(b) { return ox + (b / maxBeta) * plotW; }
                                function toPlotY(g) { return oy - ((g - 1) / (maxGamma - 1)) * plotH; }

                                // Grid
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                for (var b = 0; b <= 1.0; b += 0.1) {
                                    var gx = toPlotX(b);
                                    ctx.beginPath(); ctx.moveTo(gx, oy); ctx.lineTo(gx, oy - plotH); ctx.stroke();
                                }
                                for (var g = 1; g <= maxGamma; g += 1) {
                                    var gy = toPlotY(g);
                                    ctx.beginPath(); ctx.moveTo(ox, gy); ctx.lineTo(ox + plotW, gy); ctx.stroke();
                                }

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + plotW, oy); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, oy - plotH); ctx.stroke();

                                // Tick labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                for (var b = 0; b <= 1.0; b += 0.2) {
                                    ctx.fillText(b.toFixed(1), toPlotX(b), oy + 5);
                                }
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                for (var g = 1; g <= maxGamma; g += 1) {
                                    ctx.fillText(g.toString(), ox - 6, toPlotY(g));
                                }

                                // Axis labels
                                ctx.font = 'italic 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('v / c', ox + plotW / 2, oy + 22);
                                ctx.save();
                                ctx.translate(16, oy - plotH / 2);
                                ctx.rotate(-Math.PI / 2);
                                ctx.textBaseline = 'middle';
                                ctx.fillText('\u03B3 (gamma)', 0, 0);
                                ctx.restore();

                                // Asymptote at v = c
                                ctx.strokeStyle = viz.colors.red + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([5, 5]);
                                var asymX = toPlotX(1.0);
                                ctx.beginPath(); ctx.moveTo(asymX, oy); ctx.lineTo(asymX, oy - plotH); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('v = c', asymX + 14, oy - plotH + 8, viz.colors.red, 10, 'left');

                                // gamma = 1 reference line
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath(); ctx.moveTo(ox, toPlotY(1)); ctx.lineTo(ox + plotW, toPlotY(1)); ctx.stroke();
                                ctx.setLineDash([]);

                                // The curve
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 500; i++) {
                                    var bv = i / 500 * 0.999;
                                    var gv = gammaOf(bv);
                                    if (gv > maxGamma + 2) break;
                                    var px = toPlotX(bv);
                                    var py = toPlotY(gv);
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Glow on curve
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 10;
                                ctx.strokeStyle = viz.colors.cyan + '44';
                                ctx.lineWidth = 6;
                                ctx.beginPath();
                                started = false;
                                for (var i = 0; i <= 500; i++) {
                                    var bv = i / 500 * 0.999;
                                    var gv = gammaOf(bv);
                                    if (gv > maxGamma + 2) break;
                                    var px = toPlotX(bv);
                                    var py = toPlotY(gv);
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                ctx.restore();

                                // Current point marker
                                var currentGamma = gammaOf(beta);
                                if (currentGamma <= maxGamma) {
                                    var cpx = toPlotX(beta);
                                    var cpy = toPlotY(currentGamma);

                                    // Dashed lines to axes
                                    ctx.strokeStyle = viz.colors.yellow + '88';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath(); ctx.moveTo(cpx, cpy); ctx.lineTo(cpx, oy); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(cpx, cpy); ctx.lineTo(ox, cpy); ctx.stroke();
                                    ctx.setLineDash([]);

                                    // Glowing dot
                                    var dotGrad = ctx.createRadialGradient(cpx, cpy, 3, cpx, cpy, 15);
                                    dotGrad.addColorStop(0, viz.colors.yellow);
                                    dotGrad.addColorStop(1, viz.colors.yellow + '00');
                                    ctx.fillStyle = dotGrad;
                                    ctx.beginPath(); ctx.arc(cpx, cpy, 15, 0, Math.PI * 2); ctx.fill();

                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath(); ctx.arc(cpx, cpy, 5, 0, Math.PI * 2); ctx.fill();

                                    // Value label
                                    viz.screenText('\u03B3 = ' + currentGamma.toFixed(3), cpx + 15, cpy - 15, viz.colors.yellow, 13, 'left');
                                } else {
                                    viz.screenText('\u03B3 = ' + currentGamma.toFixed(1) + ' (off scale!)', w / 2, 20, viz.colors.red, 14, 'center');
                                }

                                // Info box
                                viz.screenText('v = ' + beta.toFixed(2) + 'c    \u03B3 = ' + currentGamma.toFixed(3), w / 2, h - 14, viz.colors.white, 12, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Verify the binomial approximation: for \\(v = 0.1c\\), compute \\(\\gamma\\) exactly and via the approximation \\(\\gamma \\approx 1 + \\frac{1}{2}(v/c)^2\\). How close are they?',
                        hint: 'Substitute \\(\\beta = 0.1\\) into both formulas.',
                        solution: 'Exact: \\(\\gamma = 1/\\sqrt{1 - 0.01} = 1/\\sqrt{0.99} \\approx 1.00504\\). Approximation: \\(1 + 0.5 \\times 0.01 = 1.005\\). The difference is about 0.004%, negligible for most purposes.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Light Clock Derivation
            // ============================================================
            {
                id: 'light-clock',
                title: 'Light Clock Derivation',
                content: `
<h2>Seeing Time Dilation With a Bouncing Photon</h2>

<p>The most elegant derivation of time dilation uses a thought experiment: the <strong>light clock</strong>.</p>

<p>Imagine a clock consisting of two mirrors separated by a distance \\(L\\). A photon bounces back and forth between the mirrors. Each round trip takes:</p>

\\[\\Delta t_0 = \\frac{2L}{c}\\]

<p>This is the <strong>proper time</strong> (measured by someone at rest with the clock).</p>

<p>Now put this clock on a spaceship moving at speed \\(v\\) relative to you. The mirrors are oriented perpendicular to the motion, so they are above and below the direction of travel. From your perspective:</p>

<ul>
<li>The photon still must travel between the mirrors (distance \\(L\\) vertically).</li>
<li>But while the photon travels, the clock moves sideways by some distance.</li>
<li>The photon traces a <strong>diagonal path</strong> in your frame.</li>
</ul>

<p>The diagonal path length (one way) is, by the Pythagorean theorem:</p>

\\[d = \\sqrt{L^2 + \\left(\\frac{v\\,\\Delta t}{2}\\right)^2}\\]

<p>Since the photon travels at speed \\(c\\) (second postulate!), the round-trip time you measure is:</p>

\\[\\Delta t = \\frac{2d}{c} = \\frac{2}{c}\\sqrt{L^2 + \\frac{v^2 \\Delta t^2}{4}}\\]

<p>Squaring both sides and solving for \\(\\Delta t\\):</p>

\\[c^2 \\Delta t^2 = 4L^2 + v^2 \\Delta t^2\\]
\\[\\Delta t^2(c^2 - v^2) = 4L^2\\]
\\[\\Delta t = \\frac{2L}{\\sqrt{c^2 - v^2}} = \\frac{2L}{c} \\cdot \\frac{1}{\\sqrt{1 - v^2/c^2}}\\]

<p>But \\(2L/c = \\Delta t_0\\), so:</p>

<div class="env-block theorem">
<div class="env-title">Time Dilation Formula</div>
<div class="env-body">
\\[\\Delta t = \\frac{\\Delta t_0}{\\sqrt{1 - v^2/c^2}} = \\gamma \\, \\Delta t_0\\]
<p>A moving clock is observed to tick more slowly by a factor of \\(\\gamma\\).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The key step</div>
<div class="env-body">
<p>The entire derivation hinges on the second postulate: the photon travels at \\(c\\) in <em>both</em> frames. Without this, the diagonal path would not take longer, and there would be no time dilation.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-light-clock"></div>
`,
                visualizations: [
                    {
                        id: 'viz-light-clock',
                        title: 'SHOWPIECE: Side-by-Side Light Clocks',
                        description: 'Left: a stationary light clock. Right: the same clock moving at speed \\(v\\). The photon in the moving clock traces a longer diagonal path, so each tick takes longer. This IS time dilation. Adjust the speed and watch the diagonal stretch.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var beta = 0.6;
                            var showPath = true;

                            VizEngine.createSlider(controls, 'v / c', 0, 0.95, beta, 0.01, function (v) { beta = v; });

                            // Clock geometry
                            var mirrorGap = h * 0.45;
                            var topMirror = h * 0.18;
                            var botMirror = topMirror + mirrorGap;
                            var mirrorW = 40;

                            // Stationary clock position
                            var statX = w * 0.22;
                            // Moving clock center
                            var moveBaseX = w * 0.68;

                            var animTime = 0;

                            function gammaOf(b) { return 1 / Math.sqrt(1 - b * b); }

                            function draw(t) {
                                animTime = t * 0.001;
                                viz.clear();

                                var gamma = gammaOf(beta);

                                // Bounce period for stationary clock (arbitrary units, let's say 2 seconds)
                                var period0 = 2.0;
                                var periodMoving = period0 * gamma;

                                // Phase within cycle [0, 1] for stationary clock
                                var phase0 = (animTime % period0) / period0;
                                // Phase for moving clock (it ticks slower)
                                var phaseM = (animTime % periodMoving) / periodMoving;

                                // Photon y-position: bounces between topMirror and botMirror
                                // phase 0->0.5: going down, 0.5->1: going up
                                function photonY(phase) {
                                    var p = phase * 2; // 0 to 2
                                    if (p <= 1) return topMirror + p * mirrorGap;
                                    else return botMirror - (p - 1) * mirrorGap;
                                }

                                // ---- Background panels ----
                                // Left panel
                                ctx.fillStyle = '#0a0a1e';
                                ctx.fillRect(0, 0, w / 2 - 10, h);
                                // Right panel
                                ctx.fillStyle = '#0e0a1a';
                                ctx.fillRect(w / 2 + 10, 0, w / 2 - 10, h);

                                // Divider
                                ctx.strokeStyle = '#333';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
                                ctx.setLineDash([]);

                                // ---- STATIONARY CLOCK (left) ----
                                viz.screenText('Stationary Clock', statX, 16, viz.colors.teal, 14, 'center');
                                viz.screenText('(Your frame)', statX, 32, viz.colors.text, 10, 'center');

                                // Mirrors
                                ctx.fillStyle = '#aaccff';
                                ctx.fillRect(statX - mirrorW / 2, topMirror - 3, mirrorW, 6);
                                ctx.fillRect(statX - mirrorW / 2, botMirror - 3, mirrorW, 6);

                                // Mirror glow
                                ctx.save();
                                ctx.shadowColor = '#aaccff';
                                ctx.shadowBlur = 8;
                                ctx.fillRect(statX - mirrorW / 2, topMirror - 2, mirrorW, 4);
                                ctx.fillRect(statX - mirrorW / 2, botMirror - 2, mirrorW, 4);
                                ctx.restore();

                                // Photon path (vertical line)
                                ctx.strokeStyle = viz.colors.yellow + '33';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(statX, topMirror);
                                ctx.lineTo(statX, botMirror);
                                ctx.stroke();

                                // Photon
                                var phoY0 = photonY(phase0);
                                var phoGrad = ctx.createRadialGradient(statX, phoY0, 2, statX, phoY0, 14);
                                phoGrad.addColorStop(0, '#ffffff');
                                phoGrad.addColorStop(0.3, viz.colors.yellow);
                                phoGrad.addColorStop(1, viz.colors.yellow + '00');
                                ctx.fillStyle = phoGrad;
                                ctx.beginPath(); ctx.arc(statX, phoY0, 14, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#ffffff';
                                ctx.beginPath(); ctx.arc(statX, phoY0, 4, 0, Math.PI * 2); ctx.fill();

                                // Distance label
                                ctx.strokeStyle = viz.colors.text + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(statX + mirrorW / 2 + 15, topMirror);
                                ctx.lineTo(statX + mirrorW / 2 + 15, botMirror);
                                ctx.stroke();
                                // Arrow heads
                                ctx.beginPath();
                                ctx.moveTo(statX + mirrorW / 2 + 10, topMirror + 8);
                                ctx.lineTo(statX + mirrorW / 2 + 15, topMirror);
                                ctx.lineTo(statX + mirrorW / 2 + 20, topMirror + 8);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(statX + mirrorW / 2 + 10, botMirror - 8);
                                ctx.lineTo(statX + mirrorW / 2 + 15, botMirror);
                                ctx.lineTo(statX + mirrorW / 2 + 20, botMirror - 8);
                                ctx.stroke();
                                viz.screenText('L', statX + mirrorW / 2 + 28, (topMirror + botMirror) / 2, viz.colors.text, 13, 'left', 'middle');

                                // Time tick counter
                                var tickCount0 = Math.floor(animTime / period0);
                                viz.screenText('Ticks: ' + tickCount0, statX, botMirror + 35, viz.colors.teal, 13, 'center');
                                viz.screenText('\u0394t\u2080 = 2L/c', statX, botMirror + 55, viz.colors.teal, 11, 'center');

                                // ---- MOVING CLOCK (right) ----
                                viz.screenText('Moving Clock (your view)', moveBaseX, 16, viz.colors.orange, 14, 'center');
                                viz.screenText('Speed = ' + beta.toFixed(2) + 'c', moveBaseX, 32, viz.colors.text, 10, 'center');

                                // Horizontal displacement of clock during one half-trip
                                var halfTripTime = periodMoving / 2;
                                var horizDisp = beta * mirrorGap * 0.8; // visual scale

                                // The moving clock's current x-offset oscillates
                                var movePhaseNorm = phaseM * 2; // 0 to 2
                                var currentXOff;
                                if (movePhaseNorm <= 1) {
                                    currentXOff = -horizDisp / 2 + movePhaseNorm * horizDisp;
                                } else {
                                    currentXOff = horizDisp / 2 - (movePhaseNorm - 1) * horizDisp;
                                }

                                // Mirrors for moving clock (at current position)
                                var mClockX = moveBaseX + currentXOff;
                                ctx.fillStyle = '#ffccaa';
                                ctx.fillRect(mClockX - mirrorW / 2, topMirror - 3, mirrorW, 6);
                                ctx.fillRect(mClockX - mirrorW / 2, botMirror - 3, mirrorW, 6);
                                ctx.save();
                                ctx.shadowColor = '#ffccaa';
                                ctx.shadowBlur = 8;
                                ctx.fillRect(mClockX - mirrorW / 2, topMirror - 2, mirrorW, 4);
                                ctx.fillRect(mClockX - mirrorW / 2, botMirror - 2, mirrorW, 4);
                                ctx.restore();

                                // Arrow showing direction of motion
                                if (beta > 0.01) {
                                    ctx.strokeStyle = viz.colors.orange + '88';
                                    ctx.lineWidth = 1.5;
                                    var arrowY = topMirror - 18;
                                    ctx.beginPath();
                                    ctx.moveTo(mClockX - 25, arrowY);
                                    ctx.lineTo(mClockX + 25, arrowY);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(mClockX + 18, arrowY - 4);
                                    ctx.lineTo(mClockX + 25, arrowY);
                                    ctx.lineTo(mClockX + 18, arrowY + 4);
                                    ctx.stroke();
                                    viz.screenText('v', mClockX + 32, arrowY, viz.colors.orange, 11, 'left', 'middle');
                                }

                                // Diagonal photon path (the key visual!)
                                // Start position at phase=0: top-left; at phase=0.5: bottom-right; at phase=1: top-left again
                                var startX, startY, endX, endY;
                                if (movePhaseNorm <= 1) {
                                    startX = moveBaseX - horizDisp / 2;
                                    startY = topMirror;
                                    endX = moveBaseX + horizDisp / 2;
                                    endY = botMirror;
                                } else {
                                    startX = moveBaseX + horizDisp / 2;
                                    startY = botMirror;
                                    endX = moveBaseX - horizDisp / 2;
                                    endY = topMirror;
                                }

                                // Draw the diagonal path line
                                ctx.strokeStyle = viz.colors.yellow + '44';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(startX, startY);
                                ctx.lineTo(endX, endY);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Photon on moving clock
                                var phoYM = photonY(phaseM);
                                var phoXM = mClockX;
                                var mPhoGrad = ctx.createRadialGradient(phoXM, phoYM, 2, phoXM, phoYM, 14);
                                mPhoGrad.addColorStop(0, '#ffffff');
                                mPhoGrad.addColorStop(0.3, viz.colors.gold);
                                mPhoGrad.addColorStop(1, viz.colors.gold + '00');
                                ctx.fillStyle = mPhoGrad;
                                ctx.beginPath(); ctx.arc(phoXM, phoYM, 14, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#ffffff';
                                ctx.beginPath(); ctx.arc(phoXM, phoYM, 4, 0, Math.PI * 2); ctx.fill();

                                // Show the right triangle: L (vertical), v*dt/2 (horizontal), d (diagonal)
                                if (beta > 0.05) {
                                    // Draw the triangle
                                    ctx.strokeStyle = viz.colors.purple + 'aa';
                                    ctx.lineWidth = 1.5;
                                    // Vertical leg
                                    ctx.beginPath();
                                    ctx.moveTo(startX, startY);
                                    ctx.lineTo(startX, endY);
                                    ctx.stroke();
                                    // Horizontal leg
                                    ctx.beginPath();
                                    ctx.moveTo(startX, endY);
                                    ctx.lineTo(endX, endY);
                                    ctx.stroke();
                                    // Hypotenuse (the diagonal path)
                                    ctx.strokeStyle = viz.colors.yellow + '88';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(startX, startY);
                                    ctx.lineTo(endX, endY);
                                    ctx.stroke();

                                    // Right angle marker
                                    var raSize = 10;
                                    ctx.strokeStyle = viz.colors.purple + '88';
                                    ctx.lineWidth = 1;
                                    if (movePhaseNorm <= 1) {
                                        ctx.beginPath();
                                        ctx.moveTo(startX + raSize, endY);
                                        ctx.lineTo(startX + raSize, endY - raSize);
                                        ctx.lineTo(startX, endY - raSize);
                                        ctx.stroke();
                                    }

                                    // Labels
                                    viz.screenText('L', startX - 14, (startY + endY) / 2, viz.colors.purple, 12, 'right', 'middle');
                                    if (horizDisp > 20) {
                                        viz.screenText('v\u00B7\u0394t/2', (startX + endX) / 2, endY + 16, viz.colors.purple, 10, 'center');
                                    }
                                    // Diagonal label
                                    var diagLen = Math.sqrt(mirrorGap * mirrorGap + horizDisp * horizDisp);
                                    var dText = 'd = c\u00B7\u0394t/2';
                                    var midDX = (startX + endX) / 2 + 12;
                                    var midDY = (startY + endY) / 2 - 10;
                                    viz.screenText(dText, midDX, midDY, viz.colors.yellow, 10, 'left');
                                }

                                // Time tick counter for moving clock
                                var tickCountM = Math.floor(animTime / periodMoving);
                                viz.screenText('Ticks: ' + tickCountM, moveBaseX, botMirror + 35, viz.colors.orange, 13, 'center');
                                viz.screenText('\u0394t = \u03B3 \u00B7 2L/c', moveBaseX, botMirror + 55, viz.colors.orange, 11, 'center');

                                // Bottom info bar
                                var infoY = h - 16;
                                viz.screenText('\u03B3 = ' + gamma.toFixed(3) + '    |    Stationary tick: ' + tickCount0 + '    Moving tick: ' + tickCountM + '    (Moving clock is slower!)', w / 2, infoY, viz.colors.white, 11, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the light-clock derivation, why must the mirrors be oriented perpendicular to the direction of motion (not parallel)?',
                        hint: 'Think about what happens to the distance between mirrors if they are aligned along the direction of motion.',
                        solution: 'If the mirrors are parallel to the motion, length contraction changes the distance between them. The perpendicular orientation avoids this complication because lengths perpendicular to the direction of motion are unaffected. (You can derive the same time dilation either way, but the perpendicular setup makes the Pythagorean argument cleaner.)'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Twin Paradox
            // ============================================================
            {
                id: 'twin-paradox',
                title: 'The Twin Paradox',
                content: `
<h2>One Twin Ages Less</h2>

<p>The twin paradox is the most famous thought experiment in special relativity. It seems to create a contradiction, but careful analysis resolves it completely.</p>

<div class="env-block example">
<div class="env-title">The Setup</div>
<div class="env-body">
<p>Twins Alice and Bob are 20 years old. Alice stays on Earth. Bob boards a spaceship, travels to a star 10 light-years away at \\(0.8c\\), immediately turns around, and returns at the same speed.</p>
<p>How old is each twin when Bob returns?</p>
</div>
</div>

<p><strong>Alice's calculation (Earth frame):</strong></p>
<p>Total distance: \\(2 \\times 10 = 20\\) light-years. Speed: \\(0.8c\\). Travel time: \\(20 / 0.8 = 25\\) years. Alice ages 25 years and is now 45.</p>

<p><strong>Bob's proper time:</strong></p>
<p>\\(\\gamma = 5/3\\) at \\(v = 0.8c\\). Bob's clock runs slower: \\(\\Delta t_{\\text{Bob}} = 25 / \\gamma = 25 \\times 0.6 = 15\\) years. Bob ages 15 years and is now 35.</p>

<div class="env-block theorem">
<div class="env-title">The Result</div>
<div class="env-body">
<p>When the twins reunite, Alice is 45 and Bob is 35. Bob is genuinely 10 years younger than his twin. This has been confirmed experimentally with atomic clocks on airplanes and satellites.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">The "paradox"</div>
<div class="env-body">
<p>Here is the apparent contradiction: from Bob's perspective, it was <em>Earth</em> that moved away and came back. By symmetry, shouldn't Alice be the younger one? The resolution is that the situation is <strong>not symmetric</strong>. Bob must accelerate to turn around. He changes inertial frames. Alice remains in a single inertial frame the entire time. The twin who accelerates (changes frames) ages less.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Experimental confirmation</div>
<div class="env-body">
<p>In 1971, Hafele and Keating flew cesium atomic clocks on commercial airplanes around the world. The traveling clocks gained or lost nanoseconds relative to ground clocks, exactly as relativity predicted (including both special and general relativistic effects).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-twin-paradox"></div>
`,
                visualizations: [
                    {
                        id: 'viz-twin-paradox',
                        title: 'The Twin Paradox: Aging Comparison',
                        description: 'Watch Alice and Bob age as Bob travels to a distant star and back. The progress bar shows elapsed Earth time. When Bob returns, compare their ages. Adjust the speed to see how much younger Bob is at different velocities.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var beta = 0.8;
                            var distance = 10; // light-years to star
                            var playing = true;
                            var progress = 0; // 0 to 1

                            VizEngine.createSlider(controls, 'v / c', 0.3, 0.99, beta, 0.01, function (v) { beta = v; progress = 0; });
                            VizEngine.createButton(controls, 'Restart', function () { progress = 0; });

                            function gammaOf(b) { return 1 / Math.sqrt(1 - b * b); }

                            function draw(t) {
                                if (playing && progress < 1) {
                                    progress += 0.002;
                                    if (progress > 1) progress = 1;
                                }

                                viz.clear();

                                var gamma = gammaOf(beta);
                                var earthTime = 2 * distance / beta; // total Earth years
                                var bobTime = earthTime / gamma;
                                var currentEarthYears = progress * earthTime;
                                var currentBobYears = progress * bobTime;

                                // --- Scene Layout ---
                                var earthX = 80;
                                var starX = w - 100;
                                var sceneY = h * 0.45;
                                var trackY = sceneY + 5;

                                // Stars background
                                var rng = 42;
                                for (var i = 0; i < 80; i++) {
                                    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
                                    var sx = rng % w;
                                    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
                                    var sy = rng % (sceneY - 30);
                                    ctx.fillStyle = 'rgba(255,255,255,' + (0.15 + (rng % 40) / 100) + ')';
                                    ctx.beginPath(); ctx.arc(sx, sy + 30, 0.8, 0, Math.PI * 2); ctx.fill();
                                }

                                // Earth
                                var earthGrad = ctx.createRadialGradient(earthX, sceneY, 5, earthX, sceneY, 22);
                                earthGrad.addColorStop(0, '#4488ff');
                                earthGrad.addColorStop(0.6, '#336699');
                                earthGrad.addColorStop(1, '#33669900');
                                ctx.fillStyle = earthGrad;
                                ctx.beginPath(); ctx.arc(earthX, sceneY, 22, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#3fb950';
                                // Simple continent blobs
                                ctx.beginPath(); ctx.arc(earthX - 3, sceneY - 5, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(earthX + 5, sceneY + 3, 4, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('Earth', earthX, sceneY + 34, viz.colors.blue, 11, 'center');

                                // Star
                                var starGlow = ctx.createRadialGradient(starX, sceneY, 3, starX, sceneY, 25);
                                starGlow.addColorStop(0, '#ffd700');
                                starGlow.addColorStop(0.4, '#ff880066');
                                starGlow.addColorStop(1, '#ff880000');
                                ctx.fillStyle = starGlow;
                                ctx.beginPath(); ctx.arc(starX, sceneY, 25, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#ffd700';
                                ctx.beginPath(); ctx.arc(starX, sceneY, 8, 0, Math.PI * 2); ctx.fill();
                                viz.screenText(distance + ' ly away', starX, sceneY + 34, viz.colors.yellow, 11, 'center');

                                // Track line
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 5]);
                                ctx.beginPath();
                                ctx.moveTo(earthX + 25, trackY);
                                ctx.lineTo(starX - 12, trackY);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Bob's spaceship position
                                var shipX;
                                if (progress <= 0.5) {
                                    // Outbound
                                    shipX = earthX + 30 + (progress * 2) * (starX - earthX - 50);
                                } else {
                                    // Return
                                    shipX = starX - 20 - ((progress - 0.5) * 2) * (starX - earthX - 50);
                                }

                                // Spaceship
                                var shipDir = progress <= 0.5 ? 1 : -1;
                                ctx.save();
                                ctx.translate(shipX, sceneY - 25);
                                ctx.scale(shipDir, 1);
                                // Ship body
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(15, 0);
                                ctx.lineTo(-10, -6);
                                ctx.lineTo(-10, 6);
                                ctx.closePath();
                                ctx.fill();
                                // Engine glow
                                if (progress < 1) {
                                    var engGrad = ctx.createRadialGradient(-10, 0, 2, -10, 0, 12);
                                    engGrad.addColorStop(0, '#ff440088');
                                    engGrad.addColorStop(1, '#ff440000');
                                    ctx.fillStyle = engGrad;
                                    ctx.beginPath(); ctx.arc(-10, 0, 12, 0, Math.PI * 2); ctx.fill();
                                }
                                ctx.restore();
                                viz.screenText('Bob', shipX, sceneY - 42, viz.colors.orange, 11, 'center');

                                // Alice stays on Earth
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.arc(earthX, sceneY - 32, 5, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('Alice', earthX, sceneY - 45, viz.colors.teal, 10, 'center');

                                // --- Aging comparison bars ---
                                var barY = h * 0.72;
                                var barH = 30;
                                var barMaxW = w * 0.55;
                                var barLeft = w * 0.25;

                                var startAge = 20;
                                var aliceAge = startAge + currentEarthYears;
                                var bobAge = startAge + currentBobYears;
                                var maxAge = startAge + earthTime;

                                // Alice's bar
                                viz.screenText('Alice:', barLeft - 8, barY + 6, viz.colors.teal, 12, 'right');
                                ctx.fillStyle = viz.colors.bg;
                                ctx.strokeStyle = viz.colors.teal + '44';
                                ctx.lineWidth = 1;
                                ctx.fillRect(barLeft, barY - barH / 2, barMaxW, barH);
                                ctx.strokeRect(barLeft, barY - barH / 2, barMaxW, barH);
                                var aliceW = (aliceAge / maxAge) * barMaxW;
                                var aliceGrad = ctx.createLinearGradient(barLeft, 0, barLeft + aliceW, 0);
                                aliceGrad.addColorStop(0, viz.colors.teal);
                                aliceGrad.addColorStop(1, '#3fb9a088');
                                ctx.fillStyle = aliceGrad;
                                ctx.fillRect(barLeft, barY - barH / 2, aliceW, barH);
                                viz.screenText(aliceAge.toFixed(1) + ' yrs', barLeft + aliceW + 8, barY, viz.colors.teal, 12, 'left', 'middle');

                                // Bob's bar
                                var bobBarY = barY + barH + 18;
                                viz.screenText('Bob:', barLeft - 8, bobBarY + 6, viz.colors.orange, 12, 'right');
                                ctx.fillStyle = viz.colors.bg;
                                ctx.strokeStyle = viz.colors.orange + '44';
                                ctx.fillRect(barLeft, bobBarY - barH / 2, barMaxW, barH);
                                ctx.strokeRect(barLeft, bobBarY - barH / 2, barMaxW, barH);
                                var bobW = (bobAge / maxAge) * barMaxW;
                                var bobGrad = ctx.createLinearGradient(barLeft, 0, barLeft + bobW, 0);
                                bobGrad.addColorStop(0, viz.colors.orange);
                                bobGrad.addColorStop(1, '#f0883e88');
                                ctx.fillStyle = bobGrad;
                                ctx.fillRect(barLeft, bobBarY - barH / 2, bobW, barH);
                                viz.screenText(bobAge.toFixed(1) + ' yrs', barLeft + bobW + 8, bobBarY, viz.colors.orange, 12, 'left', 'middle');

                                // Info text
                                viz.screenText('v = ' + beta.toFixed(2) + 'c    \u03B3 = ' + gamma.toFixed(2) + '    Earth time: ' + currentEarthYears.toFixed(1) + ' / ' + earthTime.toFixed(1) + ' yrs', w / 2, 16, viz.colors.white, 12, 'center');

                                // Conclusion when done
                                if (progress >= 1) {
                                    var diff = (aliceAge - bobAge).toFixed(1);
                                    viz.screenText('Bob is ' + diff + ' years younger than Alice!', w / 2, h - 14, viz.colors.gold, 13, 'center');
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the twin paradox, Bob travels 10 light-years at \\(0.9c\\) and returns. How old is each twin upon reunion if both start at age 20?',
                        hint: "Compute the Earth time for the round trip, then divide by \\\\(\\\\gamma\\\\) for Bob's proper time.",
                        solution: "Earth time: \\\\(2 \\\\times 10 / 0.9 = 22.2\\\\) years. \\\\(\\\\gamma = 1/\\\\sqrt{1-0.81} = 1/\\\\sqrt{0.19} \\\\approx 2.294\\\\). Bob's time: \\\\(22.2 / 2.294 \\\\approx 9.7\\\\) years. Alice is \\\\(20 + 22.2 = 42.2\\\\) years old. Bob is \\\\(20 + 9.7 = 29.7\\\\) years old."
                    },
                    {
                        question: 'Explain in one sentence why the twin paradox is not actually a paradox.',
                        hint: 'Which twin changes inertial frames?',
                        solution: 'The situation is not symmetric because Bob accelerates (changes inertial frames) when he turns around, while Alice remains in a single inertial frame, so there is no contradiction in Bob aging less.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Muon Evidence
            // ============================================================
            {
                id: 'muon-evidence',
                title: 'Muon Evidence',
                content: `
<h2>Nature Confirms Time Dilation</h2>

<p>Time dilation is not just a thought experiment. Cosmic-ray muons provide beautiful, direct evidence.</p>

<div class="env-block definition">
<div class="env-title">Definition: Muon</div>
<div class="env-body">
<p>A <strong>muon</strong> (\\(\\mu\\)) is a subatomic particle similar to an electron but about 207 times heavier. Muons are created when cosmic rays hit the upper atmosphere at altitudes of about 10 km. They have a half-life of \\(\\tau_{1/2} = 1.56\\;\\mu\\text{s}\\) (microseconds) at rest.</p>
</div>
</div>

<p>A muon traveling at \\(v \\approx 0.998c\\) has \\(\\gamma \\approx 15.8\\). Without time dilation, the muon would travel only:</p>

\\[d = v \\cdot \\tau_{1/2} = 0.998 \\times 3 \\times 10^8 \\times 1.56 \\times 10^{-6} \\approx 467\\;\\text{m}\\]

<p>in one half-life. After traveling 10 km (about 21 half-lives), essentially no muons should survive. Yet detectors at sea level observe abundant muons.</p>

<div class="env-block theorem">
<div class="env-title">Time Dilation Explains It</div>
<div class="env-body">
<p>In the Earth frame, the muon's half-life is dilated to:</p>
\\[\\tau'_{1/2} = \\gamma \\cdot \\tau_{1/2} \\approx 15.8 \\times 1.56 = 24.6\\;\\mu\\text{s}\\]
<p>In this time, the muon travels \\(d = 0.998c \\times 24.6\\;\\mu\\text{s} \\approx 7400\\;\\text{m}\\) per half-life. After 10 km (about 1.35 half-lives), roughly 39% survive. This matches observations.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The muon's perspective</div>
<div class="env-body">
<p>From the muon's frame, it is the Earth (and its atmosphere) that moves upward at \\(0.998c\\). The atmosphere is length-contracted to about \\(10\\;\\text{km}/15.8 \\approx 630\\;\\text{m}\\). The muon lives only \\(1.56\\;\\mu\\text{s}\\) in its own frame, but it only needs to traverse 630 m. Both frames give the same answer: lots of muons reach the surface.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Two explanations, same physics</div>
<div class="env-body">
<p>Earth says: "The muon's clock runs slow, so it lives long enough to reach us." The muon says: "The distance is shorter, so I reach the surface before I decay." Time dilation and length contraction are two sides of the same coin.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-muon-rain"></div>
`,
                visualizations: [
                    {
                        id: 'viz-muon-rain',
                        title: 'Muon Rain: With and Without Relativity',
                        description: 'Muons are created at the top of the atmosphere (10 km). Left: classical prediction (muons decay quickly, few reach ground). Right: relativistic prediction (time-dilated muons survive). Watch the muon counts at the detector.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var halfW = w / 2 - 15;
                            var beta = 0.998;
                            var gamma = 1 / Math.sqrt(1 - beta * beta);

                            var classicalCount = 0;
                            var relativisticCount = 0;
                            var spawnTimer = 0;

                            var muonsClassical = [];
                            var muonsRelativistic = [];

                            var topY = 40;
                            var botY = h - 50;
                            var atmHeight = botY - topY;

                            VizEngine.createButton(controls, 'Reset Counts', function () {
                                classicalCount = 0;
                                relativisticCount = 0;
                            });

                            function spawnMuon() {
                                // Classical half-life in frames (representing 1.56 us at 0.998c, without dilation)
                                // 10 km atmosphere, muon at 0.998c takes ~33.4 us to traverse
                                // Half-life: 1.56 us -> about 21 half-lives
                                // Probability of survival through one "step" based on half-life
                                var classicalLifespan = 0.07 + Math.random() * 0.08; // fraction of atmosphere before decay (without relativity)
                                var relativisticLifespan = classicalLifespan * gamma; // with time dilation

                                muonsClassical.push({
                                    x: 10 + Math.random() * (halfW - 20),
                                    y: topY,
                                    speed: 1.5 + Math.random() * 0.5,
                                    maxFrac: Math.min(classicalLifespan, 1),
                                    alive: true,
                                    alpha: 1
                                });

                                muonsRelativistic.push({
                                    x: halfW + 30 + 10 + Math.random() * (halfW - 20),
                                    y: topY,
                                    speed: 1.5 + Math.random() * 0.5,
                                    maxFrac: Math.min(relativisticLifespan, 1),
                                    alive: true,
                                    alpha: 1
                                });
                            }

                            function updateMuons(arr, isRelativistic) {
                                for (var i = arr.length - 1; i >= 0; i--) {
                                    var m = arr[i];
                                    if (m.alive) {
                                        m.y += m.speed;
                                        var frac = (m.y - topY) / atmHeight;
                                        if (frac >= m.maxFrac) {
                                            m.alive = false;
                                            m.alpha = 0.5;
                                        }
                                        if (m.y >= botY && m.alive) {
                                            // Reached detector
                                            if (isRelativistic) relativisticCount++;
                                            else classicalCount++;
                                            m.alive = false;
                                            m.alpha = 0;
                                        }
                                    } else {
                                        m.alpha -= 0.02;
                                    }
                                    if (m.alpha <= 0) {
                                        arr.splice(i, 1);
                                    }
                                }
                            }

                            function draw(t) {
                                viz.clear();

                                // Spawn muons
                                spawnTimer++;
                                if (spawnTimer % 8 === 0) {
                                    spawnMuon();
                                }

                                updateMuons(muonsClassical, false);
                                updateMuons(muonsRelativistic, true);

                                // --- Left panel: Classical ---
                                ctx.fillStyle = '#080818';
                                ctx.fillRect(0, 0, halfW + 10, h);

                                viz.screenText('Classical (No Relativity)', halfW / 2 + 5, 16, viz.colors.red, 13, 'center');

                                // Atmosphere gradient
                                var atmGrad = ctx.createLinearGradient(0, topY, 0, botY);
                                atmGrad.addColorStop(0, '#000033');
                                atmGrad.addColorStop(0.3, '#001155');
                                atmGrad.addColorStop(1, '#003366');
                                ctx.fillStyle = atmGrad;
                                ctx.fillRect(5, topY, halfW, atmHeight);

                                // Altitude markers
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                for (var km = 0; km <= 10; km += 2) {
                                    var markerY = botY - (km / 10) * atmHeight;
                                    ctx.fillText(km + ' km', halfW + 6, markerY);
                                    ctx.strokeStyle = viz.colors.text + '22';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(5, markerY); ctx.lineTo(halfW, markerY); ctx.stroke();
                                }

                                // Detector
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.fillRect(5, botY, halfW, 8);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(5, botY); ctx.lineTo(halfW + 5, botY); ctx.stroke();

                                // Draw muons
                                for (var i = 0; i < muonsClassical.length; i++) {
                                    var m = muonsClassical[i];
                                    if (m.alpha <= 0) continue;
                                    ctx.globalAlpha = m.alpha;
                                    if (m.alive) {
                                        ctx.fillStyle = viz.colors.cyan;
                                        ctx.beginPath(); ctx.arc(m.x, m.y, 3, 0, Math.PI * 2); ctx.fill();
                                        // Trail
                                        ctx.strokeStyle = viz.colors.cyan + '44';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath(); ctx.moveTo(m.x, m.y - 8); ctx.lineTo(m.x, m.y); ctx.stroke();
                                    } else {
                                        // Decay flash
                                        ctx.fillStyle = viz.colors.red + '88';
                                        ctx.beginPath(); ctx.arc(m.x, m.y, 5, 0, Math.PI * 2); ctx.fill();
                                    }
                                    ctx.globalAlpha = 1;
                                }

                                viz.screenText('Detected: ' + classicalCount, halfW / 2, botY + 28, viz.colors.green, 12, 'center');

                                // --- Right panel: Relativistic ---
                                ctx.fillStyle = '#0a0818';
                                ctx.fillRect(halfW + 20, 0, halfW + 10, h);

                                viz.screenText('Relativistic (\u03B3 = ' + gamma.toFixed(1) + ')', halfW + 20 + halfW / 2, 16, viz.colors.gold, 13, 'center');

                                // Atmosphere
                                ctx.fillStyle = atmGrad;
                                ctx.fillRect(halfW + 25, topY, halfW, atmHeight);

                                // Altitude markers
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                for (var km = 0; km <= 10; km += 2) {
                                    var markerY = botY - (km / 10) * atmHeight;
                                    ctx.fillText(km + ' km', halfW + 25 + halfW + 4, markerY);
                                }

                                // Detector
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.fillRect(halfW + 25, botY, halfW, 8);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(halfW + 25, botY); ctx.lineTo(w - 5, botY); ctx.stroke();

                                // Draw muons
                                for (var i = 0; i < muonsRelativistic.length; i++) {
                                    var m = muonsRelativistic[i];
                                    if (m.alpha <= 0) continue;
                                    ctx.globalAlpha = m.alpha;
                                    if (m.alive) {
                                        ctx.fillStyle = viz.colors.gold;
                                        ctx.beginPath(); ctx.arc(m.x, m.y, 3, 0, Math.PI * 2); ctx.fill();
                                        ctx.strokeStyle = viz.colors.gold + '44';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath(); ctx.moveTo(m.x, m.y - 8); ctx.lineTo(m.x, m.y); ctx.stroke();
                                    } else {
                                        ctx.fillStyle = viz.colors.red + '88';
                                        ctx.beginPath(); ctx.arc(m.x, m.y, 5, 0, Math.PI * 2); ctx.fill();
                                    }
                                    ctx.globalAlpha = 1;
                                }

                                viz.screenText('Detected: ' + relativisticCount, halfW + 20 + halfW / 2, botY + 28, viz.colors.green, 12, 'center');

                                // Divider
                                ctx.strokeStyle = '#444';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(halfW + 15, 0); ctx.lineTo(halfW + 15, h); ctx.stroke();
                                ctx.setLineDash([]);

                                // Bottom label
                                viz.screenText('Muon half-life: 1.56 \u03BCs at rest    |    v = ' + beta + 'c    |    Atmosphere: 10 km', w / 2, h - 10, viz.colors.text, 10, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A muon is created at 10 km altitude traveling at \\(0.995c\\). Its rest half-life is \\(1.56\\;\\mu\\text{s}\\). How many half-lives does the trip take in the Earth frame vs. the muon frame?',
                        hint: 'First find \\(\\gamma\\). Then compute the Earth-frame travel time and divide by the dilated half-life. For the muon frame, use the rest half-life and the length-contracted distance.',
                        solution: '\\(\\gamma = 1/\\sqrt{1 - 0.990025} \\approx 10.0\\). Earth-frame travel time: \\(10000 / (0.995 \\times 3 \\times 10^8) \\approx 33.5\\;\\mu\\text{s}\\). Dilated half-life: \\(10.0 \\times 1.56 = 15.6\\;\\mu\\text{s}\\). Number of half-lives (Earth frame): \\(33.5 / 15.6 \\approx 2.1\\). In the muon frame, the distance is \\(10000/10 = 1000\\) m. Travel time: \\(1000/(0.995 \\times 3 \\times 10^8) = 3.35\\;\\mu\\text{s}\\). Half-lives: \\(3.35/1.56 \\approx 2.1\\). Both frames agree.'
                    }
                ]
            }
        ]
    });
})();
