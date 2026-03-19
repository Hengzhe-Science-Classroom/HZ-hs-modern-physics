// === Chapter 2: Length Contraction ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch02',
        number: 2,
        title: 'Length Contraction',
        subtitle: 'Moving objects shrink along the direction of motion, and spacetime insists on it',
        file: 'ch02-length-contraction',

        sections: [
            // ============================================================
            // Section 0: Moving Objects Are Shorter
            // ============================================================
            {
                id: 'objects-are-shorter',
                title: 'Moving Objects Are Shorter',
                content: `
<h2>Space Itself Compresses</h2>

<p>Time dilation has a spatial twin: <strong>length contraction</strong>. An object moving relative to an observer is measured to be shorter along its direction of motion than when measured at rest.</p>

<div class="env-block definition">
<div class="env-title">Definition: Length Contraction</div>
<div class="env-body">
<p>If an object has <em>proper length</em> \\(L_0\\) (its length measured at rest), then an observer who sees the object moving at speed \\(v\\) measures its length as:</p>
\\[L = \\frac{L_0}{\\gamma} = L_0 \\sqrt{1 - \\frac{v^2}{c^2}}\\]
<p>The contraction occurs <strong>only along the direction of motion</strong>. Dimensions perpendicular to the motion are unchanged.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Proper Length</div>
<div class="env-body">
<p>The <strong>proper length</strong> \\(L_0\\) of an object is the length measured in the rest frame of the object, where both ends are measured simultaneously. It is always the longest length any observer can measure.</p>
</div>
</div>

<p>Consider a spaceship with a rest length of 100 m traveling at \\(0.8c\\). An observer on the ground measures its length as:</p>

\\[L = 100 \\times \\sqrt{1 - 0.64} = 100 \\times 0.6 = 60\\;\\text{m}\\]

<p>The ship is 40% shorter. But to the crew on board, the ship is its full 100 m; it is the ground (and everything on it) that is contracted.</p>

<div class="env-block warning">
<div class="env-title">Contraction is real but reciprocal</div>
<div class="env-body">
<p>Length contraction is not an optical illusion or a measurement artifact. It is a genuine geometric fact about spacetime. However, just like time dilation, it is reciprocal: each observer sees the other's objects contracted. This is consistent because they are measuring different spacetime slices of "now."</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Connecting to time dilation</div>
<div class="env-body">
<p>Remember the muon from Chapter 1? In the Earth frame, the muon's clock runs slow, so it lives long enough to reach the ground. In the muon's frame, the atmosphere is length-contracted to a fraction of 10 km. Both perspectives give the same prediction: length contraction and time dilation are two manifestations of the same spacetime geometry.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-ship-contraction"></div>
`,
                visualizations: [
                    {
                        id: 'viz-ship-contraction',
                        title: 'Spaceship Length Contraction',
                        description: 'A spaceship passes by at speed \\(v\\). Drag the slider to increase its speed and watch it contract along the direction of motion. The vertical height stays unchanged. Rulers show the measured length.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var beta = 0.0;
                            var restLength = 200; // pixels representing proper length
                            var shipCenterX = w / 2;
                            var shipY = h * 0.38;

                            VizEngine.createSlider(controls, 'v / c', 0, 0.99, beta, 0.01, function (v) { beta = v; });

                            function gammaOf(b) { return b >= 1 ? Infinity : 1 / Math.sqrt(1 - b * b); }

                            function drawShip(cx, cy, len, shipH, color, showMotion) {
                                var halfL = len / 2;
                                // Body
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(cx + halfL + 20, cy); // nose
                                ctx.lineTo(cx + halfL, cy - shipH / 2);
                                ctx.lineTo(cx - halfL, cy - shipH / 2);
                                ctx.lineTo(cx - halfL - 10, cy - shipH / 2 + 5);
                                ctx.lineTo(cx - halfL - 10, cy + shipH / 2 - 5);
                                ctx.lineTo(cx - halfL, cy + shipH / 2);
                                ctx.lineTo(cx + halfL, cy + shipH / 2);
                                ctx.closePath();
                                ctx.fill();

                                // Window strip
                                ctx.fillStyle = '#aaddff44';
                                ctx.fillRect(cx - halfL * 0.5, cy - 5, halfL, 10);

                                // Cockpit
                                ctx.fillStyle = '#88ccff66';
                                ctx.beginPath();
                                ctx.arc(cx + halfL + 5, cy, 8, 0, Math.PI * 2);
                                ctx.fill();

                                // Engine
                                ctx.fillStyle = '#ff660066';
                                ctx.beginPath();
                                ctx.arc(cx - halfL - 10, cy, 8, 0, Math.PI * 2);
                                ctx.fill();

                                // Glow
                                ctx.save();
                                ctx.shadowColor = color;
                                ctx.shadowBlur = 15;
                                ctx.strokeStyle = color + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(cx + halfL + 20, cy);
                                ctx.lineTo(cx + halfL, cy - shipH / 2);
                                ctx.lineTo(cx - halfL, cy - shipH / 2);
                                ctx.moveTo(cx + halfL + 20, cy);
                                ctx.lineTo(cx + halfL, cy + shipH / 2);
                                ctx.lineTo(cx - halfL, cy + shipH / 2);
                                ctx.stroke();
                                ctx.restore();

                                if (showMotion && beta > 0.01) {
                                    // Motion arrow
                                    ctx.strokeStyle = viz.colors.text + '88';
                                    ctx.lineWidth = 1.5;
                                    var arrowY = cy - shipH / 2 - 18;
                                    ctx.beginPath();
                                    ctx.moveTo(cx - 30, arrowY);
                                    ctx.lineTo(cx + 30, arrowY);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(cx + 22, arrowY - 4);
                                    ctx.lineTo(cx + 30, arrowY);
                                    ctx.lineTo(cx + 22, arrowY + 4);
                                    ctx.stroke();
                                    viz.screenText('v = ' + beta.toFixed(2) + 'c', cx, arrowY - 10, viz.colors.text, 10, 'center');
                                }
                            }

                            function drawRuler(x1, x2, y, color, label) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1.5;
                                // End caps
                                ctx.beginPath(); ctx.moveTo(x1, y - 6); ctx.lineTo(x1, y + 6); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(x2, y - 6); ctx.lineTo(x2, y + 6); ctx.stroke();
                                // Line
                                ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
                                // Tick marks
                                var numTicks = 10;
                                for (var i = 1; i < numTicks; i++) {
                                    var tx = x1 + (x2 - x1) * i / numTicks;
                                    ctx.beginPath(); ctx.moveTo(tx, y - 3); ctx.lineTo(tx, y + 3); ctx.stroke();
                                }
                                // Label
                                viz.screenText(label, (x1 + x2) / 2, y + 18, color, 12, 'center');
                            }

                            function draw(t) {
                                viz.clear();

                                var gamma = gammaOf(beta);
                                var contractedLen = restLength / gamma;
                                var shipH = 45;

                                // Background stars
                                var rng = 77;
                                for (var i = 0; i < 100; i++) {
                                    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
                                    var sx = rng % w;
                                    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
                                    var sy = rng % h;
                                    var twinkle = 0.15 + 0.1 * Math.sin(t * 0.001 + i);
                                    ctx.fillStyle = 'rgba(255,255,255,' + twinkle + ')';
                                    ctx.beginPath(); ctx.arc(sx, sy, 0.7, 0, Math.PI * 2); ctx.fill();
                                }

                                // Title
                                viz.screenText('Your Frame (ground observer)', w / 2, 18, viz.colors.white, 14, 'center');

                                // Rest length reference (ghost ship)
                                ctx.globalAlpha = 0.2;
                                drawShip(shipCenterX, shipY, restLength, shipH, '#ffffff', false);
                                ctx.globalAlpha = 1;

                                // Contracted ship
                                var shipColor = VizEngine.hsl(200 - beta * 160, 80, 55);
                                drawShip(shipCenterX, shipY, contractedLen, shipH, shipColor, true);

                                // Rulers
                                var rulerY1 = shipY + shipH / 2 + 30;
                                // Rest length ruler (ghost)
                                ctx.globalAlpha = 0.3;
                                drawRuler(shipCenterX - restLength / 2 - 10, shipCenterX + restLength / 2 + 20, rulerY1, '#ffffff', 'L\u2080 = ' + restLength + ' (rest)');
                                ctx.globalAlpha = 1;

                                // Contracted ruler
                                var rulerY2 = rulerY1 + 40;
                                drawRuler(shipCenterX - contractedLen / 2 - 10, shipCenterX + contractedLen / 2 + 20, rulerY2, viz.colors.cyan, 'L = ' + contractedLen.toFixed(1) + ' (measured)');

                                // Info panel
                                var infoY = h * 0.78;
                                ctx.fillStyle = '#0c0c2088';
                                ctx.fillRect(w * 0.15, infoY - 15, w * 0.7, 70);
                                ctx.strokeStyle = viz.colors.purple + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(w * 0.15, infoY - 15, w * 0.7, 70);

                                viz.screenText('v / c = ' + beta.toFixed(2), w * 0.33, infoY + 5, viz.colors.white, 13, 'center');
                                viz.screenText('\u03B3 = ' + gamma.toFixed(3), w * 0.5, infoY + 5, viz.colors.yellow, 13, 'center');
                                viz.screenText('L / L\u2080 = ' + (1 / gamma).toFixed(3), w * 0.67, infoY + 5, viz.colors.cyan, 13, 'center');

                                var percent = ((1 - 1 / gamma) * 100).toFixed(1);
                                viz.screenText('The ship is ' + percent + '% shorter than at rest', w / 2, infoY + 32, viz.colors.text, 11, 'center');

                                // Perpendicular note
                                viz.screenText('Height is unchanged (contraction only along direction of motion)', w / 2, h - 14, viz.colors.text, 10, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A meter stick moves past you at \\(0.9c\\) along its length. How long do you measure it to be?',
                        hint: 'Apply \\(L = L_0/\\gamma\\) with \\(L_0 = 1\\) m.',
                        solution: '\\(\\gamma = 1/\\sqrt{1-0.81} = 1/\\sqrt{0.19} \\approx 2.294\\). So \\(L = 1/2.294 \\approx 0.436\\) m, or about 43.6 cm.'
                    },
                    {
                        question: 'Does a moving object get thinner (contracted in all directions) or only shorter along the direction of motion?',
                        hint: 'Think about what happens to dimensions perpendicular to the velocity.',
                        solution: 'Only shorter along the direction of motion. Perpendicular dimensions are unaffected. A sphere moving at high speed would look like a pancake (flattened along the velocity direction) but with unchanged height and width perpendicular to the motion.'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Formula
            // ============================================================
            {
                id: 'the-formula',
                title: 'The Formula',
                content: `
<h2>Deriving Length Contraction</h2>

<p>Length contraction follows directly from time dilation. Consider two observers: Alice (at rest) and Bob (moving at speed \\(v\\)). Bob measures the distance between two points by noting when each point passes him and multiplying by his speed.</p>

<p>Alice marks two points a distance \\(L_0\\) apart (proper length). Bob, moving at \\(v\\), times how long it takes both points to pass him. In his frame, the time between the two events is the proper time \\(\\Delta t_0\\) (since both events happen at his location):</p>

\\[L_0 = v \\, \\Delta t \\quad \\text{(Alice's measurement, using her time)}\\]

<p>where \\(\\Delta t = \\gamma \\, \\Delta t_0\\) is Alice's dilated time. Bob measures:</p>

\\[L = v \\, \\Delta t_0 = v \\cdot \\frac{\\Delta t}{\\gamma} = \\frac{L_0}{\\gamma}\\]

<div class="env-block theorem">
<div class="env-title">Length Contraction Formula</div>
<div class="env-body">
\\[L = \\frac{L_0}{\\gamma} = L_0 \\sqrt{1 - \\frac{v^2}{c^2}}\\]
<p>where \\(L_0\\) is the proper length (rest length) and \\(L\\) is the length measured by an observer who sees the object moving at speed \\(v\\).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Consistency check</div>
<div class="env-body">
<p>At \\(v = 0\\): \\(L = L_0\\). No contraction. At \\(v \\to c\\): \\(L \\to 0\\). The object shrinks to zero length. These limits make physical sense: a stationary object has its full length, and an object at the speed of light (if it had mass) would be infinitely contracted.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: The LHC Protons</div>
<div class="env-body">
<p>Protons in the Large Hadron Collider travel at about \\(0.9999999c\\) (\\(\\gamma \\approx 7000\\)). A proton has a rest diameter of about \\(1.7 \\times 10^{-15}\\) m. In the lab frame, along the beam direction, the proton appears contracted to:</p>
\\[L = \\frac{1.7 \\times 10^{-15}}{7000} \\approx 2.4 \\times 10^{-19}\\;\\text{m}\\]
<p>That is far smaller than a single proton at rest. The proton bunch, from the lab's perspective, is an ultraflat pancake.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: "Show that length contraction and time dilation are consistent: if a muon at \\\\(0.998c\\\\) traverses 10 km of atmosphere (Earth frame), how thick is the atmosphere in the muon's frame?",
                        hint: "The atmosphere moves at \\\\(0.998c\\\\) relative to the muon, so it is length-contracted.",
                        solution: "\\\\(\\\\gamma = 1/\\\\sqrt{1-0.996004} \\\\approx 15.8\\\\). The atmosphere in the muon's frame: \\\\(L = 10000/15.8 \\\\approx 633\\\\) m. The muon, with its rest half-life of \\\\(1.56\\\\;\\\\mu\\\\text{s}\\\\), can travel \\\\(0.998c \\\\times 1.56 \\\\times 10^{-6} \\\\approx 467\\\\) m per half-life. After 633/467 \\\\(\\\\approx\\\\) 1.35 half-lives, about 39% survive, matching the Earth-frame calculation."
                    }
                ]
            },

            // ============================================================
            // Section 2: The Ladder Paradox
            // ============================================================
            {
                id: 'ladder-paradox',
                title: 'The Ladder Paradox',
                content: `
<h2>Does the Ladder Fit in the Garage?</h2>

<p>The ladder paradox (also called the barn-pole paradox) is a delightful puzzle that tests your understanding of length contraction and simultaneity.</p>

<div class="env-block example">
<div class="env-title">The Setup</div>
<div class="env-body">
<p>A ladder has proper length 10 m. A garage has proper length 8 m. The ladder moves horizontally at \\(0.8c\\) toward the garage. Does the ladder fit inside?</p>
</div>
</div>

<p><strong>Garage frame:</strong> The ladder is length-contracted to \\(10/\\gamma = 10 \\times 0.6 = 6\\) m. The garage is 8 m. The 6 m ladder fits with 2 m to spare. Both doors can be briefly shut simultaneously with the ladder inside.</p>

<p><strong>Ladder frame:</strong> The garage is length-contracted to \\(8 \\times 0.6 = 4.8\\) m. The ladder is 10 m. The ladder does NOT fit. There is no instant when both doors are shut simultaneously with the ladder inside.</p>

<div class="env-block theorem">
<div class="env-title">Resolution: Simultaneity</div>
<div class="env-body">
<p>Both frames agree on all observable physics. The resolution lies in the <strong>relativity of simultaneity</strong>. In the garage frame, both doors shut at the same time, and the ladder fits. In the ladder frame, the doors do NOT shut at the same time. The front door shuts first (while the back of the ladder is still outside the back door), then opens before the back door shuts. At no single moment in the ladder frame are both doors closed. There is no contradiction.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The key insight</div>
<div class="env-body">
<p>"Does the ladder fit?" is really asking "Are both doors shut at the same time with the ladder inside?" Since "at the same time" depends on the frame, the answer depends on the frame. But both frames agree on every measurable outcome: the ladder enters, the doors do their thing, and the ladder exits without being chopped.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-ladder-paradox"></div>
`,
                visualizations: [
                    {
                        id: 'viz-ladder-paradox',
                        title: 'The Ladder Paradox: Two Frames',
                        description: 'Top: garage frame (ladder is contracted, fits inside). Bottom: ladder frame (garage is contracted, ladder sticks out). Watch the doors and notice how their timing differs between frames.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var beta = 0.8;
                            var animSpeed = 0.5;
                            var progress = 0; // 0 to 1

                            VizEngine.createSlider(controls, 'v / c', 0.3, 0.95, beta, 0.01, function (v) { beta = v; progress = 0; });
                            VizEngine.createSlider(controls, 'Speed', 0.1, 1.5, animSpeed, 0.1, function (v) { animSpeed = v; });
                            VizEngine.createButton(controls, 'Restart', function () { progress = 0; });

                            function gammaOf(b) { return 1 / Math.sqrt(1 - b * b); }

                            var garageRestLen = 120; // px
                            var ladderRestLen = 150; // px

                            function draw(t) {
                                progress += animSpeed * 0.003;
                                if (progress > 1.3) progress = -0.3;
                                viz.clear();

                                var gamma = gammaOf(beta);
                                var frameHalf = h / 2 - 5;

                                // --- TOP: Garage Frame ---
                                var gfY = frameHalf * 0.5;
                                viz.screenText('Garage Frame', w / 2, 14, viz.colors.teal, 14, 'center');

                                var garageX = w / 2 - garageRestLen / 2;
                                var contractedLadder = ladderRestLen / gamma;

                                // Ladder position in garage frame
                                var totalTravel = w + ladderRestLen;
                                var ladderFrontX = -contractedLadder + progress * totalTravel;
                                var ladderBackX = ladderFrontX - contractedLadder;

                                // Determine door states (garage frame: both doors shut simultaneously when ladder is fully inside)
                                var ladderInside = ladderBackX >= garageX && ladderFrontX <= garageX + garageRestLen;
                                var frontDoorShut = ladderInside;
                                var backDoorShut = ladderInside;

                                // Garage walls
                                ctx.fillStyle = '#1a2a3a';
                                ctx.fillRect(garageX, gfY - 30, garageRestLen, 60);
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                // Top wall
                                ctx.beginPath(); ctx.moveTo(garageX, gfY - 30); ctx.lineTo(garageX + garageRestLen, gfY - 30); ctx.stroke();
                                // Bottom wall
                                ctx.beginPath(); ctx.moveTo(garageX, gfY + 30); ctx.lineTo(garageX + garageRestLen, gfY + 30); ctx.stroke();

                                // Back door (left side)
                                if (backDoorShut) {
                                    ctx.fillStyle = viz.colors.green + '88';
                                    ctx.fillRect(garageX - 3, gfY - 30, 6, 60);
                                } else {
                                    ctx.strokeStyle = viz.colors.text + '44';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(garageX, gfY - 30); ctx.lineTo(garageX, gfY + 30); ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // Front door (right side)
                                if (frontDoorShut) {
                                    ctx.fillStyle = viz.colors.green + '88';
                                    ctx.fillRect(garageX + garageRestLen - 3, gfY - 30, 6, 60);
                                } else {
                                    ctx.strokeStyle = viz.colors.text + '44';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(garageX + garageRestLen, gfY - 30); ctx.lineTo(garageX + garageRestLen, gfY + 30); ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // Ladder (contracted in this frame)
                                ctx.fillStyle = viz.colors.orange + 'cc';
                                ctx.fillRect(ladderBackX, gfY - 8, contractedLadder, 16);
                                // Rungs
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                var numRungs = 6;
                                for (var i = 0; i <= numRungs; i++) {
                                    var rx = ladderBackX + contractedLadder * i / numRungs;
                                    ctx.beginPath(); ctx.moveTo(rx, gfY - 8); ctx.lineTo(rx, gfY + 8); ctx.stroke();
                                }

                                // Labels
                                viz.screenText('Garage: ' + garageRestLen + ' (rest)', w / 2, gfY + 48, viz.colors.teal, 10, 'center');
                                viz.screenText('Ladder: ' + contractedLadder.toFixed(0) + ' (contracted)', w / 2, gfY + 62, viz.colors.orange, 10, 'center');
                                if (ladderInside) {
                                    viz.screenText('FITS! Both doors shut.', w / 2, gfY - 48, viz.colors.green, 13, 'center');
                                }

                                // Divider
                                ctx.strokeStyle = '#333';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(30, frameHalf); ctx.lineTo(w - 30, frameHalf); ctx.stroke();

                                // --- BOTTOM: Ladder Frame ---
                                var lfY = frameHalf + frameHalf * 0.5 + 10;
                                viz.screenText('Ladder Frame', w / 2, frameHalf + 14, viz.colors.orange, 14, 'center');

                                var contractedGarage = garageRestLen / gamma;

                                // In ladder frame, the garage moves to the left
                                var garageMoveFrontX = w + 50 - progress * totalTravel;
                                var garageMoveBackX = garageMoveFrontX - contractedGarage;

                                // Ladder stays centered
                                var ladderLFLeft = w / 2 - ladderRestLen / 2;
                                var ladderLFRight = ladderLFLeft + ladderRestLen;

                                // Door logic in ladder frame: NOT simultaneous
                                // Front door (right) shuts when ladder front reaches it
                                var frontReached = garageMoveFrontX <= ladderLFRight && garageMoveFrontX >= ladderLFLeft;
                                // Back door (left) shuts when ladder back is past it
                                var backReached = garageMoveBackX >= ladderLFLeft && garageMoveBackX <= ladderLFRight;
                                // Front shuts first, then opens; back shuts later
                                var ladderFrontInsideGarage = ladderLFRight <= garageMoveFrontX + 5 && ladderLFRight >= garageMoveBackX;
                                var ladderBackInsideGarage = ladderLFLeft >= garageMoveBackX - 5 && ladderLFLeft <= garageMoveFrontX;
                                var frontDoorLF = ladderFrontInsideGarage && !ladderBackInsideGarage;
                                var bothDoors = ladderFrontInsideGarage && ladderBackInsideGarage;

                                // Ladder (full rest length)
                                ctx.fillStyle = viz.colors.orange + 'cc';
                                ctx.fillRect(ladderLFLeft, lfY - 8, ladderRestLen, 16);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                for (var i = 0; i <= numRungs; i++) {
                                    var rx = ladderLFLeft + ladderRestLen * i / numRungs;
                                    ctx.beginPath(); ctx.moveTo(rx, lfY - 8); ctx.lineTo(rx, lfY + 8); ctx.stroke();
                                }

                                // Garage (contracted, moving)
                                ctx.fillStyle = '#1a2a3a88';
                                ctx.fillRect(garageMoveBackX, lfY - 30, contractedGarage, 60);
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(garageMoveBackX, lfY - 30); ctx.lineTo(garageMoveFrontX, lfY - 30); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(garageMoveBackX, lfY + 30); ctx.lineTo(garageMoveFrontX, lfY + 30); ctx.stroke();

                                // Doors in ladder frame
                                ctx.fillStyle = ladderFrontInsideGarage ? viz.colors.green + '88' : viz.colors.text + '22';
                                ctx.fillRect(garageMoveFrontX - 3, lfY - 30, 6, 60);

                                ctx.fillStyle = ladderBackInsideGarage ? viz.colors.green + '88' : viz.colors.text + '22';
                                ctx.fillRect(garageMoveBackX - 3, lfY - 30, 6, 60);

                                // Labels
                                viz.screenText('Ladder: ' + ladderRestLen + ' (rest)', w / 2, lfY + 48, viz.colors.orange, 10, 'center');
                                viz.screenText('Garage: ' + contractedGarage.toFixed(0) + ' (contracted)', w / 2, lfY + 62, viz.colors.teal, 10, 'center');

                                if (!ladderBackInsideGarage && ladderFrontInsideGarage) {
                                    viz.screenText('Front door shuts, back door still open!', w / 2, lfY - 48, viz.colors.yellow, 12, 'center');
                                }

                                // Speed info
                                viz.screenText('v = ' + beta.toFixed(2) + 'c    \u03B3 = ' + gamma.toFixed(2), w / 2, h - 14, viz.colors.white, 11, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the ladder paradox, if the ladder and garage have the same proper length (10 m each), at what speed does the ladder exactly fit in the garage frame?',
                        hint: 'Set \\(L_0/\\gamma = L_{\\text{garage}}\\). Since \\(L_0 = L_{\\text{garage}}\\), you need \\(\\gamma = 1\\).',
                        solution: 'If both have proper length 10 m, the ladder in the garage frame has length \\(10/\\gamma\\). For it to fit in 10 m, we need \\(10/\\gamma \\leq 10\\), i.e., \\(\\gamma \\geq 1\\). This is satisfied for any \\(v > 0\\). Even a tiny speed will contract the ladder enough to fit (barely). The paradox becomes interesting when the ladder is longer than the garage at rest, say 12 m ladder in 10 m garage: then \\(12/\\gamma = 10\\) gives \\(\\gamma = 1.2\\), so \\(v \\approx 0.553c\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Relativistic Visualization
            // ============================================================
            {
                id: 'relativistic-visualization',
                title: 'Relativistic Visualization',
                content: `
<h2>What Would You Actually See?</h2>

<p>There is a subtle distinction between what special relativity <em>predicts for measurements</em> and what your <em>eyes would actually see</em> if you flew past objects at near-light speed.</p>

<div class="env-block warning">
<div class="env-title">Measurement vs. appearance</div>
<div class="env-body">
<p>Length contraction describes what you <em>measure</em> using synchronized clocks and rulers. What you <em>see</em> (with your eyes or a camera) is different because light from different parts of an object arrives at your eye at different times. The visual effect includes Lorentz contraction, aberration of light, and the Doppler effect.</p>
</div>
</div>

<p>When you fly through a star field at high speed, several visual effects combine:</p>

<ol>
<li><strong>Aberration</strong>: Stars ahead appear to crowd toward the center of your field of view. Stars behind spread apart. This is because the direction of incoming light is tilted forward by your motion.</li>
<li><strong>Doppler shift</strong>: Stars ahead are blue-shifted (higher frequency). Stars behind are red-shifted (lower frequency).</li>
<li><strong>Searchlight effect</strong>: Stars ahead appear brighter because more photons per second arrive from the forward direction.</li>
<li><strong>Terrell rotation</strong>: A sphere moving at high speed does not look flattened; it looks <em>rotated</em>. This is because light from the back of the sphere, emitted earlier, reaches your eye at the same time as light from the front.</li>
</ol>

<div class="env-block remark">
<div class="env-title">Penrose and Terrell (1959)</div>
<div class="env-body">
<p>Roger Penrose and James Terrell independently showed that a sphere at relativistic speed appears rotated, not squashed. This was a surprise; for over 50 years after Einstein's 1905 paper, textbooks incorrectly described what a fast-moving sphere would look like.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-starfield"></div>
`,
                visualizations: [
                    {
                        id: 'viz-starfield',
                        title: 'Relativistic Star Field',
                        description: 'Fly through a star field at relativistic speed. Watch stars crowd toward the center (aberration), shift blue ahead and red behind (Doppler), and brighten in front (searchlight effect). Increase v/c to see the effects intensify.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var beta = 0.0;
                            var numStars = 200;
                            var stars = [];

                            VizEngine.createSlider(controls, 'v / c', 0, 0.99, beta, 0.01, function (v) { beta = v; });

                            // Generate random star positions in angular coordinates
                            var rng = 31415;
                            function nextRng() {
                                rng = (rng * 1103515245 + 12345) & 0x7fffffff;
                                return (rng & 0xffff) / 0xffff;
                            }
                            for (var i = 0; i < numStars; i++) {
                                // theta: angle from forward direction (0 = ahead, pi = behind)
                                var theta = Math.acos(1 - 2 * nextRng()); // uniform on sphere
                                var phi = nextRng() * Math.PI * 2;
                                var baseTemp = 3000 + nextRng() * 7000; // stellar temperature
                                var baseBrightness = 0.3 + nextRng() * 0.7;
                                stars.push({ theta: theta, phi: phi, baseTemp: baseTemp, brightness: baseBrightness });
                            }

                            function tempToColor(temp) {
                                // Simplified blackbody color
                                var t = VizEngine.clamp((temp - 2000) / 30000, 0, 1);
                                var r, g, b;
                                if (t < 0.33) {
                                    r = 255;
                                    g = Math.round(80 + t * 3 * 175);
                                    b = Math.round(t * 3 * 150);
                                } else if (t < 0.5) {
                                    r = 255;
                                    g = 255;
                                    b = Math.round(150 + (t - 0.33) * 6 * 105);
                                } else {
                                    r = Math.round(255 - (t - 0.5) * 2 * 100);
                                    g = Math.round(255 - (t - 0.5) * 2 * 60);
                                    b = 255;
                                }
                                return 'rgb(' + r + ',' + g + ',' + b + ')';
                            }

                            function draw(t) {
                                viz.clear();

                                // Deep space background
                                ctx.fillStyle = '#020208';
                                ctx.fillRect(0, 0, w, h);

                                var cx = w / 2, cy = h / 2;
                                var maxR = Math.min(w, h) * 0.45;

                                // Forward direction label circle
                                ctx.strokeStyle = '#ffffff11';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 5, 0, Math.PI * 2);
                                ctx.stroke();

                                for (var i = 0; i < stars.length; i++) {
                                    var s = stars[i];

                                    // Relativistic aberration: cos(theta') = (cos(theta) - beta) / (1 - beta * cos(theta))
                                    var cosTheta = Math.cos(s.theta);
                                    var cosThetaPrime = (cosTheta - beta) / (1 - beta * cosTheta);
                                    var thetaPrime = Math.acos(VizEngine.clamp(cosThetaPrime, -1, 1));

                                    // Project onto 2D (forward = center)
                                    var r = (thetaPrime / Math.PI) * maxR * 2;
                                    var sx = cx + r * Math.cos(s.phi);
                                    var sy = cy + r * Math.sin(s.phi);

                                    // Skip if outside canvas
                                    if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

                                    // Doppler factor: D = 1 / (gamma * (1 - beta * cos(theta)))
                                    var gamma = beta < 1 ? 1 / Math.sqrt(1 - beta * beta) : 1;
                                    var D = 1 / (gamma * (1 - beta * cosTheta));

                                    // Apparent temperature (Doppler shifted)
                                    var apparentTemp = s.baseTemp * D;

                                    // Brightness boost (D^3 for intensity, simplified)
                                    var brightBoost = Math.pow(D, 2.5);
                                    var brightness = VizEngine.clamp(s.brightness * brightBoost, 0, 1);

                                    var color = tempToColor(apparentTemp);
                                    var starSize = 0.5 + brightness * 2.5;

                                    ctx.globalAlpha = VizEngine.clamp(brightness, 0.05, 1);

                                    // Glow
                                    if (brightness > 0.4) {
                                        var glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, starSize * 3);
                                        glow.addColorStop(0, color);
                                        glow.addColorStop(1, 'rgba(0,0,0,0)');
                                        ctx.fillStyle = glow;
                                        ctx.beginPath();
                                        ctx.arc(sx, sy, starSize * 3, 0, Math.PI * 2);
                                        ctx.fill();
                                    }

                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.arc(sx, sy, starSize, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                ctx.globalAlpha = 1;

                                // Crosshair at center (forward direction)
                                ctx.strokeStyle = '#ffffff22';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(cx - 15, cy); ctx.lineTo(cx + 15, cy);
                                ctx.moveTo(cx, cy - 15); ctx.lineTo(cx, cy + 15);
                                ctx.stroke();

                                // Labels
                                viz.screenText('Forward', cx, 16, viz.colors.text, 10, 'center');
                                viz.screenText('v = ' + beta.toFixed(2) + 'c', w - 10, 16, viz.colors.yellow, 12, 'right');

                                if (beta > 0.3) {
                                    viz.screenText('Stars crowd forward (aberration)', cx, h - 30, viz.colors.cyan, 10, 'center');
                                    viz.screenText('Ahead: blue-shifted & brighter  |  Behind: red-shifted & dimmer', cx, h - 14, viz.colors.text, 9, 'center');
                                } else {
                                    viz.screenText('Increase speed to see relativistic effects', cx, h - 14, viz.colors.text, 10, 'center');
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A spaceship flies past you at \\(0.9c\\). Would the ship look simply squashed (like a compressed photo), or would you see something more complex?',
                        hint: 'Think about light from different parts of the ship arriving at your eye at different times.',
                        solution: 'You would see something more complex than a simple squash. Due to light travel time effects (Terrell rotation), the ship would appear rotated rather than simply compressed. Additionally, aberration would distort its apparent angular size, and the Doppler effect would change its color. The measurement of length contraction requires synchronized clocks, which is a different operation from taking a snapshot with your eyes.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Proper Length
            // ============================================================
            {
                id: 'proper-length',
                title: 'Proper Length',
                content: `
<h2>The "True" Length of an Object</h2>

<p>Given that different observers measure different lengths for the same object, which length is the "real" one? The answer is nuanced.</p>

<div class="env-block definition">
<div class="env-title">Definition: Proper Length (revisited)</div>
<div class="env-body">
<p>The <strong>proper length</strong> \\(L_0\\) of an object is its length measured in the frame in which the object is at rest. This is also called the <strong>rest length</strong>. It is the maximum length any observer can measure.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Every length is "real"</div>
<div class="env-body">
<p>All observers' measurements are physically valid. The proper length is special not because it is more real, but because all observers agree on its value (they may not be able to measure it directly, but they can compute it). It is an <strong>invariant</strong> of the object.</p>
</div>
</div>

<p>The proper length and the spacetime interval are closely related. Consider the two endpoints of a rod. In the rod's rest frame, the events "left end at time \\(t\\)" and "right end at time \\(t\\)" are simultaneous and separated by \\(L_0\\). The spacetime interval is:</p>

\\[\\Delta s^2 = -c^2(0)^2 + L_0^2 = L_0^2\\]

<p>This interval is invariant. In any other frame, the spatial separation is different (contracted), but the time separation is also different (not simultaneous), and the combination \\(\\Delta s^2\\) stays the same.</p>

<div class="env-block remark">
<div class="env-title">Summary: proper quantities</div>
<div class="env-body">
<p><strong>Proper time</strong> (\\(\\Delta \\tau\\)): the time measured by a clock present at both events. It is the <em>minimum</em> time interval.</p>
<p><strong>Proper length</strong> (\\(L_0\\)): the length measured in the rest frame. It is the <em>maximum</em> length.</p>
<p>Both are invariant quantities that all observers agree on, even though they may measure different coordinate times and lengths.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: The Earth-Star Distance</div>
<div class="env-body">
<p>A star is 10 light-years from Earth (proper distance, measured in the rest frame of both). An astronaut flying at \\(0.99c\\) measures this distance as:</p>
\\[L = \\frac{10}{\\gamma} = \\frac{10}{7.09} \\approx 1.41\\;\\text{light-years}\\]
<p>The astronaut experiences a much shorter trip. To her, the universe is compressed along her direction of motion. She still cannot exceed \\(c\\) locally, but the distance she needs to traverse is much smaller.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">This is how interstellar travel becomes feasible (in principle)</div>
<div class="env-body">
<p>If you could travel at \\(0.9999c\\) (\\(\\gamma \\approx 70.7\\)), the distance to a star 100 light-years away contracts to only 1.4 light-years in your frame. Your clocks also run slow, so you experience only about 1.4 years of travel. The catch: the people on Earth wait 100 years for you to arrive.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'The distance from Earth to the center of our galaxy is about 26,000 light-years. At what speed would you need to travel so that, in your frame, this distance is only 1 light-year?',
                        hint: 'Set \\(L = 1\\) ly, \\(L_0 = 26000\\) ly, and solve \\(L = L_0/\\gamma\\) for \\(v\\).',
                        solution: '\\(\\gamma = L_0/L = 26000\\). Then \\(1 - v^2/c^2 = 1/\\gamma^2 = 1/26000^2 \\approx 1.48 \\times 10^{-9}\\). So \\(v/c = \\sqrt{1 - 1.48 \\times 10^{-9}} \\approx 0.999999999\\,c\\). You need to be extraordinarily close to the speed of light.'
                    },
                    {
                        question: 'Explain in your own words why length contraction does not mean objects are "really" shorter. What does it mean?',
                        hint: 'Think about what "length" means operationally (how you measure it) and how that measurement depends on your reference frame.',
                        solution: "Length is defined operationally: you measure the positions of both ends simultaneously and compute the difference. But \"simultaneously\" depends on the observer's reference frame. Different frames slice spacetime differently, measuring different spatial separations. No slice is more correct than another. Length contraction means that the spatial extent of an object depends on the spacetime slice (reference frame) used to measure it, just as the shadow of a stick depends on the angle of the light."
                    }
                ]
            }
        ]
    });
})();
