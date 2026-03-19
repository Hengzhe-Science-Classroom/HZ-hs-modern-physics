// === Chapter 0: The Speed of Light & Einstein ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch00',
        number: 0,
        title: 'The Speed of Light & Einstein',
        subtitle: 'Why nothing outruns a photon, and how that one fact reshapes space and time',
        file: 'ch00-speed-of-light',

        sections: [
            // ============================================================
            // Section 0: The Speed Limit of the Universe
            // ============================================================
            {
                id: 'speed-limit',
                title: 'The Speed Limit of the Universe',
                content: `
<h2>Nothing Goes Faster</h2>

<p>Light in a vacuum travels at exactly</p>

\\[c = 299\\,792\\,458\\;\\text{m/s} \\approx 3 \\times 10^8\\;\\text{m/s}\\]

<p>That is roughly 1.08 billion km/h. In one second, light could circle the Earth about 7.5 times.</p>

<div class="env-block definition">
<div class="env-title">Definition: The Speed of Light</div>
<div class="env-body">
<p>The <strong>speed of light in vacuum</strong>, denoted \\(c\\), is a universal constant. It is the maximum speed at which energy, matter, or information can travel through the universe.</p>
</div>
</div>

<p>This is not merely a property of light. It is a property of <em>spacetime itself</em>. Electromagnetic waves, gravitational waves, and any massless particle all travel at exactly \\(c\\). Massive objects can approach \\(c\\) but never reach it; doing so would require infinite energy.</p>

<div class="env-block intuition">
<div class="env-title">Why a speed limit?</div>
<div class="env-body">
<p>Think of \\(c\\) not as "the speed of light" but as "the speed of causality." It is the fastest that any cause can produce an effect. If you push a rod, the push travels as a compression wave through the rod's atoms, and that wave is limited by \\(c\\). Nothing, not even a perfectly rigid rod, can transmit a signal faster.</p>
</div>
</div>

<p>Before Einstein, physicists assumed speeds simply add. If you walk at 5 km/h inside a train moving at 100 km/h, an observer on the platform sees you at 105 km/h. This everyday rule breaks down catastrophically near the speed of light. As we will see, the true velocity addition formula ensures the sum never exceeds \\(c\\).</p>

<div class="env-block example">
<div class="env-title">Example: How Fast is Light?</div>
<div class="env-body">
<p>The Sun is about \\(1.5 \\times 10^{11}\\) m from Earth. Light covers this distance in:</p>
\\[t = \\frac{d}{c} = \\frac{1.5 \\times 10^{11}}{3 \\times 10^8} = 500\\;\\text{s} \\approx 8.3\\;\\text{minutes}\\]
<p>When you look at the Sun, you see it as it was 8 minutes ago.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-light-travel"></div>
`,
                visualizations: [
                    {
                        id: 'viz-light-travel',
                        title: 'Light Travel Times in the Solar System',
                        description: 'Watch a photon race from the Sun past the planets. The scale is compressed so you can see the journey. Notice how even at \\(3 \\times 10^8\\) m/s, light takes minutes to hours to reach the outer planets.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 60, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Planet data: [name, distance AU, color, radius for drawing]
                            var planets = [
                                { name: 'Mercury', au: 0.39, color: '#b0b0b0', r: 3 },
                                { name: 'Venus', au: 0.72, color: '#e8c86a', r: 4 },
                                { name: 'Earth', au: 1.00, color: '#58a6ff', r: 4 },
                                { name: 'Mars', au: 1.52, color: '#f85149', r: 3.5 },
                                { name: 'Jupiter', au: 5.20, color: '#f0883e', r: 8 },
                                { name: 'Saturn', au: 9.54, color: '#d29922', r: 7 },
                                { name: 'Uranus', au: 19.2, color: '#3fb9a0', r: 5 },
                                { name: 'Neptune', au: 30.1, color: '#58a6ff', r: 5 }
                            ];

                            var maxAU = 32;
                            var scaleX = (w - 120) / maxAU;
                            var centerY = h / 2;
                            var speed = 0.5; // AU per frame-tick
                            var photonAU = 0;
                            var animTime = 0;

                            VizEngine.createSlider(controls, 'Speed', 0.1, 2.0, speed, 0.1, function (v) { speed = v; });
                            VizEngine.createButton(controls, 'Reset', function () { photonAU = 0; });

                            function auToX(au) { return 60 + au * scaleX; }

                            function draw(t) {
                                animTime = t;
                                viz.clear();

                                // Background stars
                                var rng = 12345;
                                for (var i = 0; i < 120; i++) {
                                    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
                                    var sx = (rng % w);
                                    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
                                    var sy = (rng % h);
                                    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
                                    var brightness = 0.2 + (rng % 60) / 100;
                                    ctx.fillStyle = 'rgba(255,255,255,' + brightness + ')';
                                    ctx.beginPath();
                                    ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Sun
                                var sunX = auToX(0);
                                var grad = ctx.createRadialGradient(sunX, centerY, 5, sunX, centerY, 30);
                                grad.addColorStop(0, '#ffd700');
                                grad.addColorStop(0.5, '#ff880066');
                                grad.addColorStop(1, '#ff880000');
                                ctx.fillStyle = grad;
                                ctx.beginPath();
                                ctx.arc(sunX, centerY, 30, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = '#ffd700';
                                ctx.beginPath();
                                ctx.arc(sunX, centerY, 10, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('Sun', sunX, centerY + 22, '#ffd700', 10);

                                // Planets
                                for (var i = 0; i < planets.length; i++) {
                                    var p = planets[i];
                                    var px = auToX(p.au);
                                    // Orbit line (subtle)
                                    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(px, centerY - 30);
                                    ctx.lineTo(px, centerY + 30);
                                    ctx.stroke();

                                    ctx.fillStyle = p.color;
                                    ctx.beginPath();
                                    ctx.arc(px, centerY, p.r, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Glow
                                    ctx.save();
                                    ctx.shadowColor = p.color;
                                    ctx.shadowBlur = 8;
                                    ctx.beginPath();
                                    ctx.arc(px, centerY, p.r * 0.6, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();

                                    // Name and time
                                    var lightMin = (p.au * 499.0) / 60; // 499 seconds per AU
                                    var timeLabel = lightMin < 60 ? lightMin.toFixed(1) + ' min' : (lightMin / 60).toFixed(1) + ' hr';
                                    viz.screenText(p.name, px, centerY - p.r - 14, p.color, 9, 'center');
                                    viz.screenText(timeLabel, px, centerY + p.r + 14, viz.colors.text, 8, 'center');
                                }

                                // Photon
                                photonAU += speed * 0.016; // approx 60fps
                                if (photonAU > maxAU + 1) photonAU = 0;
                                var photX = auToX(photonAU);

                                // Photon trail
                                var trailLen = 40;
                                var trailGrad = ctx.createLinearGradient(photX - trailLen, centerY, photX, centerY);
                                trailGrad.addColorStop(0, 'rgba(255,215,0,0)');
                                trailGrad.addColorStop(1, 'rgba(255,215,0,0.8)');
                                ctx.strokeStyle = trailGrad;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(photX - trailLen, centerY);
                                ctx.lineTo(photX, centerY);
                                ctx.stroke();

                                // Photon glow
                                var pGrad = ctx.createRadialGradient(photX, centerY, 2, photX, centerY, 12);
                                pGrad.addColorStop(0, '#ffffff');
                                pGrad.addColorStop(0.3, '#ffd700');
                                pGrad.addColorStop(1, '#ffd70000');
                                ctx.fillStyle = pGrad;
                                ctx.beginPath();
                                ctx.arc(photX, centerY, 12, 0, Math.PI * 2);
                                ctx.fill();

                                ctx.fillStyle = '#ffffff';
                                ctx.beginPath();
                                ctx.arc(photX, centerY, 3, 0, Math.PI * 2);
                                ctx.fill();

                                // Distance label
                                var lightSec = photonAU * 499;
                                var distLabel = lightSec < 120 ? lightSec.toFixed(0) + ' light-sec' : (lightSec / 60).toFixed(1) + ' light-min';
                                viz.screenText('Photon: ' + photonAU.toFixed(2) + ' AU (' + distLabel + ')', w / 2, 24, viz.colors.yellow, 13, 'center');

                                // Scale bar
                                viz.screenText('1 AU = 150 million km = 8.3 light-minutes', w / 2, h - 14, viz.colors.text, 10, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'The nearest star after the Sun (Proxima Centauri) is about 4.24 light-years away. How many seconds does it take light to travel there? Express your answer in scientific notation.',
                        hint: 'One light-year is the distance light travels in one year: \\(c \\times 1\\;\\text{year}\\).',
                        solution: 'One year is approximately \\(3.156 \\times 10^7\\) s. So the travel time is \\(4.24 \\times 3.156 \\times 10^7 \\approx 1.34 \\times 10^8\\) s.'
                    },
                    {
                        question: 'A spaceship travels at \\(0.9c\\). How long does it take to travel 1 light-year, as measured by a stationary observer?',
                        hint: 'For the stationary observer, the time is simply \\(t = d/v\\).',
                        solution: '\\(t = \\frac{1\\;\\text{ly}}{0.9c} = \\frac{1}{0.9}\\;\\text{year} \\approx 1.11\\;\\text{years}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Michelson-Morley Experiment
            // ============================================================
            {
                id: 'michelson-morley',
                title: 'The Michelson-Morley Experiment',
                content: `
<h2>Searching for the Aether Wind</h2>

<p>In the 19th century, physicists believed light was a wave in a medium called the <strong>luminiferous aether</strong>, just as sound is a wave in air. If the aether existed, Earth's motion through it should create an "aether wind" that affects the measured speed of light.</p>

<div class="env-block definition">
<div class="env-title">Definition: Luminiferous Aether</div>
<div class="env-body">
<p>The <strong>aether</strong> was a hypothetical substance that permeated all of space and served as the medium for light wave propagation. It was assumed to be at rest in an absolute reference frame.</p>
</div>
</div>

<p>In 1887, Albert Michelson and Edward Morley designed an elegant experiment to detect this aether wind. They split a beam of light into two perpendicular paths, reflected each beam back, and recombined them. If one path was aligned with Earth's motion through the aether, that beam should travel slightly slower (against the wind) and slightly faster (with the wind), leading to a measurable difference in travel times.</p>

<p>The apparatus was sensitive enough to detect speed differences as small as a few km/s, well within the expected 30 km/s orbital speed of Earth.</p>

<div class="env-block theorem">
<div class="env-title">Key Result: Null Result</div>
<div class="env-body">
<p>Michelson and Morley found <strong>no difference</strong> in the speed of light regardless of direction. The experiment was repeated at different times of year (when Earth's velocity direction changed). The result was always the same: the speed of light is constant in all directions.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Analogy: swimming in a river</div>
<div class="env-body">
<p>Imagine swimming across a river and back (perpendicular to the current) versus swimming upstream and back (parallel to the current). The round-trip parallel to the current takes longer because you fight the current one way. Michelson and Morley expected the same for light, but light refused to behave like a swimmer. It always arrived at the same time, regardless of the "current."</p>
</div>
</div>

<p>This was one of the most important "failed" experiments in physics. It did not find what it was looking for, and that failure pointed to something far more profound: there is no aether, and the speed of light does not depend on the observer's motion.</p>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If the aether existed, Earth orbits the Sun at about 30 km/s. What fractional change in the speed of light would you expect in the upstream vs. downstream directions?',
                        hint: 'The fractional change is approximately \\(v/c\\) or more precisely \\((v/c)^2\\) for the round-trip time difference.',
                        solution: "The round-trip time difference scales as \\\\((v/c)^2 = (30/300000)^2 = 10^{-8}\\\\). This is tiny but measurable with Michelson's interferometer, which could detect fringe shifts of about \\\\(0.01\\\\) fringes."
                    }
                ]
            },

            // ============================================================
            // Section 2: Einstein's Two Postulates
            // ============================================================
            {
                id: 'einsteins-postulates',
                title: "Einstein's Two Postulates",
                content: `
<h2>Two Simple Ideas That Changed Everything</h2>

<p>In 1905, a 26-year-old patent clerk named Albert Einstein published a paper titled "On the Electrodynamics of Moving Bodies." Instead of trying to explain the Michelson-Morley result by tweaking the aether theory, he started fresh with two bold postulates.</p>

<div class="env-block theorem">
<div class="env-title">Einstein's First Postulate: The Principle of Relativity</div>
<div class="env-body">
<p>The laws of physics are the same in all inertial (non-accelerating) reference frames. No experiment performed inside a sealed room can determine whether the room is at rest or moving at constant velocity.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Einstein's Second Postulate: Constancy of the Speed of Light</div>
<div class="env-body">
<p>The speed of light in vacuum, \\(c\\), is the same for all observers, regardless of the motion of the light source or the observer.</p>
</div>
</div>

<p>The first postulate was not new; Galileo and Newton had similar ideas. The second postulate was revolutionary. It contradicts everyday intuition: if you are running toward a flashlight, you would expect to measure a faster speed of light. Einstein says no. You still measure exactly \\(c\\).</p>

<div class="env-block warning">
<div class="env-title">This is deeply counterintuitive</div>
<div class="env-body">
<p>If a car moves at 60 km/h and you move toward it at 40 km/h, the closing speed is 100 km/h. But if a light beam moves at \\(c\\) and you move toward it at \\(0.5c\\), you still measure the light at \\(c\\), not \\(1.5c\\). Something must give, and what gives is our everyday notions of space and time.</p>
</div>
</div>

<p>From these two postulates alone, Einstein derived the following consequences:</p>
<ul>
<li>Simultaneity is relative: events simultaneous in one frame may not be in another.</li>
<li>Time dilation: moving clocks tick slower.</li>
<li>Length contraction: moving objects are shorter along the direction of motion.</li>
<li>Mass and energy are equivalent: \\(E = mc^2\\).</li>
</ul>

<p>Each of these has been confirmed experimentally to extraordinary precision.</p>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A spaceship moves at \\(0.8c\\) relative to you. It fires a laser beam forward. According to Einstein, what speed do you measure for the laser light?',
                        hint: 'The second postulate states that the speed of light is \\(c\\) for all observers.',
                        solution: 'You measure the laser light at exactly \\(c\\). The second postulate guarantees this. The speed of the source does not add to the speed of light.'
                    },
                    {
                        question: "Explain why Einstein's first postulate by itself is not revolutionary, but the combination of both postulates is.",
                        hint: 'Galileo already knew that mechanics works the same on a moving ship as on land.',
                        solution: 'The first postulate (relativity of motion) goes back to Galileo. Newtonian mechanics already obeys it. The revolutionary step is combining it with the constancy of \\(c\\). In Newtonian physics, velocities add linearly, so a universal speed limit is impossible. Once you demand that all observers measure the same \\(c\\), the Newtonian rules for combining velocities must be replaced, and time and space themselves become relative.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Simultaneity is Relative
            // ============================================================
            {
                id: 'simultaneity',
                title: 'Simultaneity is Relative',
                content: `
<h2>When "At the Same Time" Depends on Who You Ask</h2>

<p>Here is the first shocking consequence of Einstein's postulates. Imagine a train moving at high speed. Lightning strikes both ends of the train simultaneously, as seen by an observer standing on the platform.</p>

<p>A passenger sitting in the middle of the train sees something different. Because she is moving toward the front flash and away from the rear flash, and because light speed is the same in both directions for her, the light from the front strike reaches her first. She concludes the front strike happened earlier.</p>

<div class="env-block theorem">
<div class="env-title">Relativity of Simultaneity</div>
<div class="env-body">
<p>Two events that are simultaneous in one reference frame are <strong>not necessarily simultaneous</strong> in another frame moving relative to the first. Simultaneity is not absolute; it depends on the observer's state of motion.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why this must be true</div>
<div class="env-body">
<p>If both observers agreed on simultaneity, they would have to disagree on the speed of light. Since the speed of light is absolute (postulate 2), simultaneity must be relative. You cannot have both.</p>
</div>
</div>

<p>This is not an illusion or a trick of perception. It is not about the time it takes signals to reach the observer. Even after carefully correcting for signal travel times, the two observers genuinely disagree about the ordering of events. This is a fundamental feature of spacetime.</p>

<div class="env-block warning">
<div class="env-title">Causality is still safe</div>
<div class="env-body">
<p>Although the time ordering of <em>spacelike-separated</em> events (events too far apart for light to travel between them) can differ between observers, the ordering of <em>causally connected</em> events (where one could cause the other) is the same for all observers. If event A causes event B, every observer agrees that A happens first.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-simultaneity"></div>
`,
                visualizations: [
                    {
                        id: 'viz-simultaneity',
                        title: 'The Train & Lightning: Simultaneity Demo',
                        description: 'Two lightning bolts strike the ends of a moving train. The platform observer sees them as simultaneous. The train passenger, moving toward the right flash, sees it arrive first. Adjust the train speed to see the effect.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var beta = 0.4;
                            var animPhase = 0;
                            var running = true;
                            var cycleTime = 4000; // ms per cycle

                            VizEngine.createSlider(controls, 'Train speed (v/c)', 0.0, 0.9, beta, 0.05, function (v) { beta = v; });
                            VizEngine.createButton(controls, 'Restart', function () { animPhase = 0; });

                            var platformY = h * 0.30;
                            var trainY = h * 0.68;
                            var trainLen = w * 0.55;
                            var trainLeft = (w - trainLen) / 2;

                            function draw(t) {
                                animPhase = (t % cycleTime) / cycleTime;
                                viz.clear();

                                // Track
                                ctx.strokeStyle = '#4a4a7a';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([8, 4]);
                                ctx.beginPath();
                                ctx.moveTo(0, platformY + 40);
                                ctx.lineTo(w, platformY + 40);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Rails for train
                                ctx.strokeStyle = '#6a6a9a';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(0, trainY + 28);
                                ctx.lineTo(w, trainY + 28);
                                ctx.stroke();

                                // Labels
                                viz.screenText('Platform Frame', 70, platformY - 25, viz.colors.teal, 13, 'center');
                                viz.screenText('Train Frame', 70, trainY - 35, viz.colors.orange, 13, 'center');

                                // Phase: 0-0.15 = strikes happen, 0.15-0.85 = light travels, 0.85-1.0 = reset fade
                                var strikePhase = VizEngine.clamp(animPhase / 0.15, 0, 1);
                                var lightPhase = VizEngine.clamp((animPhase - 0.15) / 0.55, 0, 1);

                                var tl = trainLeft;
                                var tr = trainLeft + trainLen;
                                var tc = (tl + tr) / 2;

                                // ---- PLATFORM FRAME ----
                                // Train body (moving right)
                                var trainOffset = beta * lightPhase * trainLen * 0.3;
                                ctx.fillStyle = '#1a3a5a';
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                var tlP = tl + trainOffset;
                                var trP = tr + trainOffset;
                                ctx.beginPath();
                                ctx.roundRect(tlP, platformY - 10, trP - tlP, 35, 5);
                                ctx.fill();
                                ctx.stroke();

                                // Platform observer (at center, stationary)
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(tc, platformY + 50, 6, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('Platform observer', tc, platformY + 65, viz.colors.teal, 10, 'center');

                                // Train passenger in platform frame (moves with train)
                                var passengerPlatX = (tlP + trP) / 2;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(passengerPlatX, platformY + 5, 5, 0, Math.PI * 2);
                                ctx.fill();

                                // Lightning strikes (at ends of train at t=0)
                                if (strikePhase > 0) {
                                    var flashAlpha = strikePhase < 0.5 ? strikePhase * 2 : 2 - strikePhase * 2;
                                    // Left strike
                                    var flashGrad = ctx.createRadialGradient(tl, platformY + 5, 2, tl, platformY + 5, 25);
                                    flashGrad.addColorStop(0, 'rgba(255,255,100,' + flashAlpha + ')');
                                    flashGrad.addColorStop(1, 'rgba(255,255,100,0)');
                                    ctx.fillStyle = flashGrad;
                                    ctx.beginPath();
                                    ctx.arc(tl, platformY + 5, 25, 0, Math.PI * 2);
                                    ctx.fill();
                                    // Right strike
                                    flashGrad = ctx.createRadialGradient(tr, platformY + 5, 2, tr, platformY + 5, 25);
                                    flashGrad.addColorStop(0, 'rgba(255,255,100,' + flashAlpha + ')');
                                    flashGrad.addColorStop(1, 'rgba(255,255,100,0)');
                                    ctx.fillStyle = flashGrad;
                                    ctx.beginPath();
                                    ctx.arc(tr, platformY + 5, 25, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Light pulses in platform frame (both travel at c, equal from both ends toward center)
                                if (lightPhase > 0 && lightPhase < 1) {
                                    var lightDist = lightPhase * trainLen / 2;
                                    // From left strike
                                    var lPulseX = tl + lightDist;
                                    // From right strike
                                    var rPulseX = tr - lightDist;

                                    if (lPulseX < tr) {
                                        ctx.fillStyle = '#ffff44';
                                        ctx.beginPath();
                                        ctx.arc(lPulseX, platformY + 5, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                    if (rPulseX > tl) {
                                        ctx.fillStyle = '#ffff44';
                                        ctx.beginPath();
                                        ctx.arc(rPulseX, platformY + 5, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                    }

                                    // Platform observer sees both arrive together
                                    if (Math.abs(lPulseX - tc) < 8 && Math.abs(rPulseX - tc) < 8) {
                                        viz.screenText('Both arrive together!', tc, platformY - 30, viz.colors.green, 11, 'center');
                                    }
                                }

                                // ---- TRAIN FRAME ----
                                // Train is stationary here
                                ctx.fillStyle = '#3a1a1a';
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.roundRect(tl, trainY - 10, trainLen, 35, 5);
                                ctx.fill();
                                ctx.stroke();

                                // Passenger at center (stationary in this frame)
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(tc, trainY + 5, 5, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('Train passenger', tc, trainY + 50, viz.colors.orange, 10, 'center');

                                // In train frame, flashes are NOT simultaneous because platform moves
                                // Right flash arrives first because passenger moves toward it (from platform's view)
                                // We model: right flash arrives at lightPhase ~ 0.5*(1/(1+beta)), left at 0.5*(1/(1-beta))
                                if (lightPhase > 0 && lightPhase < 1) {
                                    var rightArrival = 0.5 / (1 + beta);
                                    var leftArrival = 0.5 / (1 - beta);
                                    var maxArr = Math.max(rightArrival, leftArrival);
                                    var normRight = rightArrival / maxArr;
                                    var normLeft = leftArrival / maxArr;

                                    var rDist = lightPhase / normRight;
                                    var lDist = lightPhase / normLeft;

                                    rDist = VizEngine.clamp(rDist, 0, 1);
                                    lDist = VizEngine.clamp(lDist, 0, 1);

                                    var rPulseTrainX = tr - rDist * trainLen / 2;
                                    var lPulseTrainX = tl + lDist * trainLen / 2;

                                    if (rDist < 1) {
                                        ctx.fillStyle = '#ffff44';
                                        ctx.beginPath();
                                        ctx.arc(rPulseTrainX, trainY + 5, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                    if (lDist < 1) {
                                        ctx.fillStyle = '#ffff44';
                                        ctx.beginPath();
                                        ctx.arc(lPulseTrainX, trainY + 5, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                    }

                                    // Annotations
                                    if (rDist >= 1 && lDist < 1 && beta > 0.05) {
                                        viz.screenText('Right flash arrived first!', tc + 60, trainY - 30, viz.colors.red, 11, 'center');
                                    }
                                    if (rDist >= 1 && lDist >= 1) {
                                        if (beta > 0.05) {
                                            viz.screenText('Not simultaneous!', tc, trainY - 30, viz.colors.red, 12, 'center');
                                        } else {
                                            viz.screenText('Nearly simultaneous (v is small)', tc, trainY - 30, viz.colors.green, 11, 'center');
                                        }
                                    }
                                }

                                // Instructions
                                if (animPhase < 0.1) {
                                    viz.screenText('Lightning strikes both ends of the train...', w / 2, h - 16, viz.colors.text, 11, 'center');
                                }

                                // v/c display
                                viz.screenText('v = ' + beta.toFixed(2) + 'c', w - 60, 20, viz.colors.yellow, 13, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the train-and-lightning thought experiment, the platform observer sees both strikes as simultaneous. Does the train passenger see the right strike first or the left strike first (assuming the train moves to the right)?',
                        hint: 'The passenger moves toward the right flash and away from the left flash. Light speed is the same in both directions for her.',
                        solution: 'The passenger sees the right (front) strike first. Since she is moving toward the right flash, that light reaches her sooner. Since she is moving away from the left flash, that light reaches her later. Because she must measure light speed as \\(c\\) in both directions, she concludes the right strike genuinely happened first.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Spacetime
            // ============================================================
            {
                id: 'spacetime',
                title: 'Spacetime',
                content: `
<h2>Weaving Space and Time Together</h2>

<p>Before Einstein, space and time were separate, absolute stages on which physics played out. After Einstein, they merge into a single four-dimensional fabric called <strong>spacetime</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Spacetime</div>
<div class="env-body">
<p><strong>Spacetime</strong> is the four-dimensional continuum that combines three dimensions of space with one dimension of time. Events are described by four coordinates: \\((x, y, z, t)\\). The geometry of spacetime determines how distances and time intervals are measured by different observers.</p>
</div>
</div>

<p>The key insight is that different observers may disagree on spatial distances and time intervals separately, but they all agree on a combined quantity called the <strong>spacetime interval</strong>:</p>

\\[\\Delta s^2 = -(c\\,\\Delta t)^2 + \\Delta x^2 + \\Delta y^2 + \\Delta z^2\\]

<p>This is the relativistic version of the Pythagorean theorem, but notice the crucial minus sign in front of the time term. It is this minus sign that makes spacetime fundamentally different from ordinary four-dimensional space.</p>

<div class="env-block definition">
<div class="env-title">Definition: Spacetime Interval</div>
<div class="env-body">
<p>The <strong>spacetime interval</strong> \\(\\Delta s^2\\) between two events is invariant: all observers in all inertial frames compute the same value, even though they disagree on \\(\\Delta t\\) and \\(\\Delta x\\) individually.</p>
<ul>
<li>\\(\\Delta s^2 < 0\\): <strong>Timelike</strong> interval. The events can be causally connected. A massive particle can travel between them.</li>
<li>\\(\\Delta s^2 = 0\\): <strong>Lightlike (null)</strong> interval. Only light can connect the two events.</li>
<li>\\(\\Delta s^2 > 0\\): <strong>Spacelike</strong> interval. No signal can travel between them. Different observers may disagree on which happened first.</li>
</ul>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The light cone</div>
<div class="env-body">
<p>At every event in spacetime, you can draw a "light cone": the set of all points reachable by light signals. Events inside your future light cone are events you can influence. Events inside your past light cone are events that could have influenced you. Events outside both cones are causally disconnected from you.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Hermann Minkowski's famous words (1908)</div>
<div class="env-body">
<p>"Henceforth space by itself, and time by itself, are doomed to fade away into mere shadows, and only a kind of union of the two will preserve an independent reality."</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-light-cone"></div>
`,
                visualizations: [
                    {
                        id: 'viz-light-cone',
                        title: 'The Light Cone',
                        description: 'A spacetime diagram with one spatial dimension (horizontal) and time (vertical). The light cone divides spacetime into future, past, and "elsewhere" (causally disconnected). Click to place events and see whether they are timelike, spacelike, or lightlike separated from the origin.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: undefined, originY: undefined });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h * 0.65;

                            var clickEvents = [];

                            VizEngine.createButton(controls, 'Clear Events', function () { clickEvents = []; });

                            // Click to add events
                            viz.canvas.addEventListener('click', function (e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                var coords = viz.toMath(mx, my);
                                clickEvents.push({ x: coords[0], t: coords[1] });
                                if (clickEvents.length > 8) clickEvents.shift();
                            });

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);

                                // Light cone (45-degree lines, since c=1 in our units)
                                // Future cone fill
                                ctx.save();
                                ctx.beginPath();
                                var topY = 0;
                                var apexScreen = viz.toScreen(0, 0);
                                var leftTop = viz.toScreen(-viz.originY / viz.scale, viz.originY / viz.scale);
                                var rightTop = viz.toScreen(viz.originY / viz.scale, viz.originY / viz.scale);
                                ctx.moveTo(apexScreen[0], apexScreen[1]);
                                ctx.lineTo(leftTop[0], topY);
                                ctx.lineTo(rightTop[0], topY);
                                ctx.closePath();
                                ctx.fillStyle = 'rgba(88,166,255,0.08)';
                                ctx.fill();
                                ctx.restore();

                                // Past cone fill
                                ctx.save();
                                ctx.beginPath();
                                var botY = h;
                                var leftBot = viz.toScreen(-(h - viz.originY) / viz.scale, -(h - viz.originY) / viz.scale);
                                var rightBot = viz.toScreen((h - viz.originY) / viz.scale, -(h - viz.originY) / viz.scale);
                                ctx.moveTo(apexScreen[0], apexScreen[1]);
                                ctx.lineTo(leftBot[0], botY);
                                ctx.lineTo(rightBot[0], botY);
                                ctx.closePath();
                                ctx.fillStyle = 'rgba(63,185,80,0.06)';
                                ctx.fill();
                                ctx.restore();

                                // Light cone lines
                                var maxR = Math.max(w, h) / viz.scale;
                                viz.drawSegment(0, 0, maxR, maxR, viz.colors.yellow, 2);
                                viz.drawSegment(0, 0, -maxR, maxR, viz.colors.yellow, 2);
                                viz.drawSegment(0, 0, maxR, -maxR, viz.colors.yellow, 2);
                                viz.drawSegment(0, 0, -maxR, -maxR, viz.colors.yellow, 2);

                                viz.drawAxes('x (space)', 'ct (time)');

                                // Labels for regions
                                viz.drawText('FUTURE', 0, 2.5, viz.colors.blue, 14);
                                viz.drawText('PAST', 0, -2.5, viz.colors.green, 14);
                                viz.drawText('ELSEWHERE', 3.5, 0, viz.colors.red, 11);
                                viz.drawText('ELSEWHERE', -3.5, 0, viz.colors.red, 11);

                                // Origin event
                                viz.drawPoint(0, 0, viz.colors.white, 'Here & Now', 6);

                                // Light cone label
                                viz.drawText('Light (c)', 2.2, 2.5, viz.colors.yellow, 10);

                                // User-placed events
                                for (var i = 0; i < clickEvents.length; i++) {
                                    var ev = clickEvents[i];
                                    var ds2 = -(ev.t * ev.t) + ev.x * ev.x; // in c=1 units
                                    var type, col;
                                    if (Math.abs(ds2) < 0.1) {
                                        type = 'lightlike';
                                        col = viz.colors.yellow;
                                    } else if (ds2 < 0) {
                                        type = 'timelike';
                                        col = viz.colors.blue;
                                    } else {
                                        type = 'spacelike';
                                        col = viz.colors.red;
                                    }
                                    viz.drawPoint(ev.x, ev.t, col, type, 5);
                                    // Dashed line to origin
                                    viz.drawSegment(0, 0, ev.x, ev.t, col, 1, true);
                                }

                                // Instructions
                                viz.screenText('Click to place events. Yellow = light cone boundary.', w / 2, h - 12, viz.colors.text, 10, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Event A happens at \\((x, t) = (0, 0)\\) and event B at \\((x, t) = (3\\;\\text{m},\\;10^{-8}\\;\\text{s})\\). Is the interval between them timelike, spacelike, or lightlike? (Use \\(c = 3 \\times 10^8\\) m/s.)',
                        hint: 'Compute \\(\\Delta s^2 = -(c\\Delta t)^2 + \\Delta x^2\\) and check its sign.',
                        solution: '\\(c\\Delta t = 3 \\times 10^8 \\times 10^{-8} = 3\\) m. So \\(\\Delta s^2 = -(3)^2 + (3)^2 = 0\\). The interval is lightlike (null). A light signal could travel exactly from A to B.'
                    },
                    {
                        question: 'Two events are spacelike separated. Can one event cause the other? Can different observers disagree about which happened first?',
                        hint: 'Think about what spacelike means: not even light can connect them.',
                        solution: 'No causal connection is possible between spacelike-separated events, since no signal (not even light) can travel between them. Yes, different observers can disagree about the time ordering. In fact, some observers will see event A first, others will see event B first, and yet others will see them as simultaneous.'
                    }
                ]
            }
        ]
    });
})();
