// === Chapter 6: Photons & Compton Scattering ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch06',
        number: 6,
        title: 'Photons & Compton Scattering',
        subtitle: 'Light carries momentum: a photon collides with an electron like a billiard ball',
        file: 'ch06-compton',

        sections: [
            // ============================================================
            // Section 0: Light as Particles
            // ============================================================
            {
                id: 'light-as-particles',
                title: 'Light as Particles',
                content: `
<h2>Photons Are Real</h2>

<p>Einstein's explanation of the photoelectric effect introduced the photon, but many physicists remained skeptical. After all, light also diffracts, interferes, and polarizes, all classic wave behaviors. Could the photoelectric effect be explained some other way, without abandoning the wave picture? What was needed was an experiment where light behaves unambiguously as a particle, obeying the same conservation laws (energy and momentum) as a billiard ball in a collision.</p>

<p>That experiment came in 1923, from Arthur Holly Compton.</p>

<div class="env-block definition">
<div class="env-title">Definition: Photon</div>
<div class="env-body">
<p>A <strong>photon</strong> is a quantum of electromagnetic radiation. It has:</p>
<ul>
<li>Energy: \\(E = h\\nu = hc/\\lambda\\)</li>
<li>Momentum: \\(p = h/\\lambda = h\\nu/c = E/c\\)</li>
<li>Zero rest mass (it always travels at speed \\(c\\))</li>
</ul>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Momentum without mass?</div>
<div class="env-body">
<p>In classical physics, momentum is \\(p = mv\\), so a massless particle would have zero momentum. But special relativity gives a more general relation: \\(E^2 = (pc)^2 + (mc^2)^2\\). For a photon (\\(m = 0\\)), this gives \\(E = pc\\), or \\(p = E/c\\). The photon has momentum because it has energy, even though it has no rest mass. This is not a mathematical trick; photon momentum is measurable (radiation pressure, solar sails, laser cooling of atoms).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-compton-showpiece"></div>
`,
                visualizations: [
                    {
                        id: 'viz-compton-showpiece',
                        title: 'Compton Scattering',
                        description: 'A high-energy photon (gold glow) collides with a stationary electron (blue glow). The photon scatters at an angle with a longer wavelength (redder color), and the electron recoils. Adjust the <strong>scattering angle</strong> to see how the wavelength shift changes. At 180\u00b0 (back-scatter), the shift is maximum.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var scatterAngle = 90; // degrees
                            VizEngine.createSlider(controls, 'Scattering Angle \u03B8 (\u00b0)', 10, 170, scatterAngle, 1, function (v) {
                                scatterAngle = v;
                                resetAnim();
                            });

                            var replayBtn = VizEngine.createButton(controls, 'Replay', function () { resetAnim(); });

                            // Compton wavelength shift: delta_lambda = (h/mc)(1 - cos theta)
                            var comptonLength = 0.00243; // nm (h/mc for electron)
                            var incidentLambda = 0.071; // nm (X-ray, like Mo K-alpha)

                            // Animation state
                            var phase = 'incoming'; // 'incoming', 'collision', 'scattered'
                            var t = 0;
                            var collisionPt = { x: w * 0.45, y: h * 0.45 };

                            // Photon
                            var photon = { x: 0, y: 0 };
                            var scPhoton = { x: 0, y: 0 }; // scattered photon
                            var electron = { x: 0, y: 0 }; // recoiling electron

                            var photonTrail = [];
                            var scPhotonTrail = [];
                            var electronTrail = [];

                            function resetAnim() {
                                phase = 'incoming';
                                t = 0;
                                photon.x = -30; photon.y = collisionPt.y;
                                scPhoton.x = collisionPt.x; scPhoton.y = collisionPt.y;
                                electron.x = collisionPt.x; electron.y = collisionPt.y;
                                photonTrail = [];
                                scPhotonTrail = [];
                                electronTrail = [];
                            }
                            resetAnim();

                            var lastTime = performance.now();

                            // Info panel
                            var infoL = w * 0.6, infoT = h * 0.55;

                            function draw(now) {
                                var dt = Math.min((now - lastTime) / 1000, 0.03);
                                lastTime = now;
                                t += dt;

                                var thetaRad = scatterAngle * Math.PI / 180;
                                var deltaLambda = comptonLength * (1 - Math.cos(thetaRad));
                                var scatteredLambda = incidentLambda + deltaLambda;

                                // Electron recoil angle (from conservation laws)
                                var electronAngle = Math.atan(Math.sin(thetaRad) / (incidentLambda / comptonLength + 1 - Math.cos(thetaRad)));

                                var speed = 250;

                                if (phase === 'incoming') {
                                    photon.x = -30 + t * speed;
                                    photon.y = collisionPt.y;
                                    photonTrail.push([photon.x, photon.y]);
                                    if (photonTrail.length > 80) photonTrail.shift();

                                    if (photon.x >= collisionPt.x) {
                                        phase = 'collision';
                                        t = 0;
                                    }
                                } else if (phase === 'collision') {
                                    if (t > 0.15) {
                                        phase = 'scattered';
                                        t = 0;
                                        scPhoton.x = collisionPt.x;
                                        scPhoton.y = collisionPt.y;
                                        electron.x = collisionPt.x;
                                        electron.y = collisionPt.y;
                                    }
                                } else if (phase === 'scattered') {
                                    var scSpeed = speed * 0.85;
                                    scPhoton.x = collisionPt.x + t * scSpeed * Math.cos(-thetaRad);
                                    scPhoton.y = collisionPt.y + t * scSpeed * Math.sin(-thetaRad);
                                    scPhotonTrail.push([scPhoton.x, scPhoton.y]);
                                    if (scPhotonTrail.length > 80) scPhotonTrail.shift();

                                    var elSpeed = speed * 0.55;
                                    electron.x = collisionPt.x + t * elSpeed * Math.cos(electronAngle);
                                    electron.y = collisionPt.y + t * elSpeed * Math.sin(electronAngle);
                                    electronTrail.push([electron.x, electron.y]);
                                    if (electronTrail.length > 60) electronTrail.shift();

                                    // Auto-replay
                                    if (t > 2.2) resetAnim();
                                }

                                // Draw
                                viz.clear();

                                // Draw angle arc at collision point
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.arc(collisionPt.x, collisionPt.y, 40, 0, -thetaRad, true);
                                ctx.stroke();
                                // Angle label
                                var labelAng = -thetaRad / 2;
                                viz.screenText('\u03B8 = ' + scatterAngle + '\u00b0',
                                    collisionPt.x + 55 * Math.cos(labelAng),
                                    collisionPt.y + 55 * Math.sin(labelAng),
                                    viz.colors.yellow, 11);

                                // Incident beam direction line (dashed)
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 0.8;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(0, collisionPt.y);
                                ctx.lineTo(w * 0.8, collisionPt.y);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Photon trail (incoming)
                                for (var i = 1; i < photonTrail.length; i++) {
                                    var alpha = i / photonTrail.length * 0.7;
                                    ctx.strokeStyle = 'rgba(255,215,0,' + alpha.toFixed(3) + ')';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(photonTrail[i - 1][0], photonTrail[i - 1][1]);
                                    ctx.lineTo(photonTrail[i][0], photonTrail[i][1]);
                                    ctx.stroke();
                                }

                                // Scattered photon trail (redder)
                                for (var j = 1; j < scPhotonTrail.length; j++) {
                                    var alpha2 = j / scPhotonTrail.length * 0.7;
                                    var redShift = VizEngine.clamp(deltaLambda / (2 * comptonLength), 0, 1);
                                    var trR = Math.round(255 * (0.9 + 0.1 * redShift));
                                    var trG = Math.round(180 * (1 - redShift * 0.5));
                                    var trB = Math.round(50 * (1 - redShift));
                                    ctx.strokeStyle = 'rgba(' + trR + ',' + trG + ',' + trB + ',' + alpha2.toFixed(3) + ')';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(scPhotonTrail[j - 1][0], scPhotonTrail[j - 1][1]);
                                    ctx.lineTo(scPhotonTrail[j][0], scPhotonTrail[j][1]);
                                    ctx.stroke();
                                }

                                // Electron trail
                                for (var k = 1; k < electronTrail.length; k++) {
                                    var alpha3 = k / electronTrail.length * 0.6;
                                    ctx.strokeStyle = 'rgba(88,166,255,' + alpha3.toFixed(3) + ')';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(electronTrail[k - 1][0], electronTrail[k - 1][1]);
                                    ctx.lineTo(electronTrail[k][0], electronTrail[k][1]);
                                    ctx.stroke();
                                }

                                // Collision flash
                                if (phase === 'collision') {
                                    var flash = 1 - t / 0.15;
                                    var flashR = 25 * flash;
                                    ctx.save();
                                    var flashGrad = ctx.createRadialGradient(collisionPt.x, collisionPt.y, 0, collisionPt.x, collisionPt.y, flashR);
                                    flashGrad.addColorStop(0, 'rgba(255,255,255,' + (0.8 * flash).toFixed(2) + ')');
                                    flashGrad.addColorStop(1, 'rgba(255,255,255,0)');
                                    ctx.fillStyle = flashGrad;
                                    ctx.beginPath();
                                    ctx.arc(collisionPt.x, collisionPt.y, flashR, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                }

                                // Draw photon (incoming)
                                if (phase === 'incoming') {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.gold;
                                    ctx.shadowBlur = 18;
                                    ctx.fillStyle = viz.colors.gold;
                                    ctx.beginPath();
                                    ctx.arc(photon.x, photon.y, 7, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                    ctx.beginPath(); ctx.arc(photon.x - 2, photon.y - 2, 2.5, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText('\u03B3', photon.x, photon.y - 15, viz.colors.gold, 12);
                                }

                                // Draw scattered photon
                                if (phase === 'scattered') {
                                    var redShift2 = VizEngine.clamp(deltaLambda / (2 * comptonLength), 0, 1);
                                    var scColor = VizEngine.hsl(45 - redShift2 * 30, 100, 50 + redShift2 * 5);
                                    ctx.save();
                                    ctx.shadowColor = scColor;
                                    ctx.shadowBlur = 14;
                                    ctx.fillStyle = scColor;
                                    ctx.beginPath();
                                    ctx.arc(scPhoton.x, scPhoton.y, 6, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    viz.screenText("\u03B3'", scPhoton.x, scPhoton.y - 13, scColor, 11);

                                    // Electron
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.blue;
                                    ctx.shadowBlur = 14;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.arc(electron.x, electron.y, 6, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = 'rgba(255,255,255,0.25)';
                                    ctx.beginPath(); ctx.arc(electron.x - 1.5, electron.y - 1.5, 2, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText('e\u207b', electron.x, electron.y - 13, viz.colors.blue, 11);
                                }

                                // Stationary electron at collision point (before collision)
                                if (phase === 'incoming') {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.blue;
                                    ctx.shadowBlur = 12;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.arc(collisionPt.x, collisionPt.y, 8, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = 'rgba(255,255,255,0.25)';
                                    ctx.beginPath(); ctx.arc(collisionPt.x - 2, collisionPt.y - 2, 3, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText('e\u207b (at rest)', collisionPt.x, collisionPt.y - 18, viz.colors.blue, 10);
                                }

                                // Info panel
                                var panelL = infoL, panelT = infoT;
                                ctx.fillStyle = 'rgba(10,10,30,0.85)';
                                ctx.fillRect(panelL, panelT, w - panelL - 15, h - panelT - 15);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(panelL, panelT, w - panelL - 15, h - panelT - 15);

                                var txtX = panelL + 12;
                                viz.screenText('Compton Shift', panelL + (w - panelL - 15) / 2, panelT + 16, viz.colors.white, 12);
                                viz.screenText('\u0394\u03BB = (\u0127/m\u2091c)(1 \u2212 cos\u03B8)', txtX, panelT + 36, viz.colors.text, 10, 'left');
                                viz.screenText('\u0394\u03BB = ' + deltaLambda.toFixed(5) + ' nm', txtX, panelT + 55, viz.colors.gold, 11, 'left');
                                viz.screenText('\u03BB\u2080 = ' + incidentLambda.toFixed(3) + ' nm', txtX, panelT + 73, viz.colors.text, 10, 'left');
                                viz.screenText("\u03BB' = " + scatteredLambda.toFixed(5) + ' nm', txtX, panelT + 91, viz.colors.orange, 11, 'left');

                                var percentShift = (deltaLambda / incidentLambda * 100).toFixed(1);
                                viz.screenText('Shift: ' + percentShift + '%', txtX, panelT + 112, viz.colors.teal, 10, 'left');

                                // Special angles note
                                if (Math.abs(scatterAngle - 90) < 2) {
                                    viz.screenText('\u03B8=90\u00b0: \u0394\u03BB = \u0127/m\u2091c', txtX, panelT + 132, viz.colors.yellow, 10, 'left');
                                } else if (Math.abs(scatterAngle - 180) < 3) {
                                    viz.screenText('\u03B8=180\u00b0: \u0394\u03BB = 2\u0127/m\u2091c (max)', txtX, panelT + 132, viz.colors.yellow, 10, 'left');
                                }

                                // Labels
                                viz.screenText('Incident X-ray', 40, collisionPt.y - 20, viz.colors.gold, 10, 'left');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'At what scattering angle is the wavelength shift maximum? What is the maximum shift in nm?',
                        hint: 'The shift is \\(\\Delta\\lambda = (h/m_ec)(1 - \\cos\\theta)\\). When is \\(1 - \\cos\\theta\\) largest?',
                        solution: 'The maximum occurs at \\(\\theta = 180\\degree\\) (back-scatter), where \\(1 - \\cos(180\\degree) = 2\\). \\(\\Delta\\lambda_{\\text{max}} = 2h/(m_ec) = 2 \\times 0.00243 = 0.00486\\) nm. This is the maximum possible wavelength shift regardless of the incident photon energy.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Photon Energy and Momentum
            // ============================================================
            {
                id: 'photon-energy-momentum',
                title: 'Photon Energy and Momentum',
                content: `
<h2>The Complete Photon Picture</h2>

<p>With both the photoelectric effect and Compton scattering established, the full description of the photon emerges. A photon is a particle of light with definite energy and momentum, both determined by its frequency (or equivalently, its wavelength).</p>

<div class="env-block theorem">
<div class="env-title">Photon Properties</div>
<div class="env-body">
\\[E = h\\nu = \\frac{hc}{\\lambda}\\]
\\[p = \\frac{h}{\\lambda} = \\frac{h\\nu}{c} = \\frac{E}{c}\\]
<p>Rest mass: \\(m = 0\\). Speed: always \\(c\\).</p>
</div>
</div>

<p>These two equations connect the wave properties (\\(\\nu\\), \\(\\lambda\\)) to the particle properties (\\(E\\), \\(p\\)). The bridge between them is Planck's constant \\(h\\).</p>

<div class="env-block example">
<div class="env-title">Example: Photon Momentum</div>
<div class="env-body">
<p>A green laser (\\(\\lambda = 532\\) nm) emits photons. Each photon has:</p>
\\[p = \\frac{h}{\\lambda} = \\frac{6.626 \\times 10^{-34}}{532 \\times 10^{-9}} = 1.25 \\times 10^{-27} \\text{ kg m/s}\\]
<p>This is tiny, but a powerful laser emitting \\(10^{18}\\) photons per second exerts a measurable force: \\(F = Np/\\Delta t \\approx 1.25 \\times 10^{-9}\\) N per watt of power. This is the principle behind radiation pressure and laser cooling of atoms.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Solar radiation pressure</div>
<div class="env-body">
<p>Sunlight exerts a pressure of about \\(4.6 \\times 10^{-6}\\) N/m\\(^2\\) on a perfectly absorbing surface near Earth. While tiny, this is enough to slowly push small objects. It affects satellite orbits, causes comet tails to point away from the Sun, and is the basis of proposed solar sails for interplanetary travel.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A radio station broadcasts at 100 MHz with 50 kW of power. How many photons per second does it emit?',
                        hint: 'Each photon has energy \\(E = h\\nu\\). Divide total power by energy per photon.',
                        solution: '\\(E = h\\nu = (6.626 \\times 10^{-34})(10^8) = 6.626 \\times 10^{-26}\\) J per photon. Number per second: \\(N = P/E = 50000/(6.626 \\times 10^{-26}) = 7.55 \\times 10^{29}\\) photons/s. Radio transmitters emit staggeringly many photons, each with very low energy.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Compton's Experiment
            // ============================================================
            {
                id: 'compton-experiment',
                title: "Compton's Experiment",
                content: `
<h2>X-rays Scatter Off Electrons</h2>

<p>In 1923, Arthur Compton directed a beam of X-rays at a graphite target and measured the wavelength of the scattered X-rays at various angles. He used a crystal spectrometer, which could measure X-ray wavelengths with high precision.</p>

<p>What Compton found was stunning:</p>
<ul>
<li>The scattered X-rays had a <em>longer wavelength</em> (lower energy) than the incident beam.</li>
<li>The wavelength shift depended on the scattering angle but <em>not</em> on the incident wavelength.</li>
<li>At each angle, there were two peaks: one at the original wavelength (scattering from tightly bound electrons in the atom) and one at the shifted wavelength (scattering from loosely bound electrons).</li>
</ul>

<div class="env-block intuition">
<div class="env-title">Why does the wavelength increase?</div>
<div class="env-body">
<p>Think of it as a collision between two billiard balls, where one (the photon) is moving and the other (the electron) is initially at rest. The photon transfers some of its energy and momentum to the electron. Having lost energy, the photon now has a lower frequency and therefore a longer wavelength. The more energy it transfers (larger scattering angle), the bigger the wavelength shift.</p>
</div>
</div>

<p>Classical wave theory (Thomson scattering) predicts that the scattered radiation should have the <em>same</em> wavelength as the incident radiation, because a classical wave simply shakes the electron at the same frequency. The observed wavelength shift is inexplicable unless light comes in discrete quanta (photons) that undergo particle-like collisions.</p>

<div class="env-block remark">
<div class="env-title">Why X-rays?</div>
<div class="env-body">
<p>Compton used X-rays (\\(\\lambda \\sim 0.07\\) nm) because the wavelength shift \\(\\Delta\\lambda \\sim 0.002\\) nm is tiny. It can only be detected as a noticeable fraction of the incident wavelength if \\(\\lambda\\) itself is very small. For visible light (\\(\\lambda \\sim 500\\) nm), the shift would be \\(0.002/500 = 0.0004\\%\\), completely undetectable.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Why does Compton scattering produce two peaks at each scattering angle?',
                        hint: 'Consider tightly bound vs loosely bound electrons.',
                        solution: 'Tightly bound (inner-shell) electrons are effectively attached to the entire atom. Since the atom\'s mass is thousands of times the electron\'s mass, the recoil energy is negligible, and the scattered photon retains its original wavelength (the unshifted peak). Loosely bound (outer) electrons behave as if they are free, and the collision transfers significant energy, giving the shifted peak.'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Wavelength Shift
            // ============================================================
            {
                id: 'wavelength-shift',
                title: 'The Wavelength Shift',
                content: `
<h2>Deriving the Compton Formula</h2>

<p>Compton derived the wavelength shift by treating the collision as a relativistic two-body problem: a photon strikes a stationary electron, and both scatter.</p>

<div class="env-block theorem">
<div class="env-title">Compton Scattering Formula</div>
<div class="env-body">
\\[\\lambda' - \\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)\\]
<p>where \\(\\lambda\\) is the incident wavelength, \\(\\lambda'\\) is the scattered wavelength, \\(\\theta\\) is the scattering angle, and \\(h/(m_ec) = 0.00243\\) nm is the <strong>Compton wavelength of the electron</strong>.</p>
</div>
</div>

<h3>Derivation Sketch</h3>

<p>Apply conservation of energy and momentum to the photon-electron collision. The photon has initial energy \\(E = hc/\\lambda\\) and momentum \\(p = h/\\lambda\\). After the collision, the photon has \\(E' = hc/\\lambda'\\) and \\(p' = h/\\lambda'\\) at angle \\(\\theta\\), and the electron recoils with relativistic energy and momentum. Combining the conservation equations and eliminating the electron's final variables yields the Compton formula.</p>

<div class="env-block definition">
<div class="env-title">Definition: Compton Wavelength</div>
<div class="env-body">
<p>The <strong>Compton wavelength of the electron</strong> is:</p>
\\[\\lambda_C = \\frac{h}{m_ec} = \\frac{6.626 \\times 10^{-34}}{(9.109 \\times 10^{-31})(3 \\times 10^8)} = 2.43 \\times 10^{-12} \\text{ m} = 0.00243 \\text{ nm}\\]
<p>It sets the scale for Compton scattering. The maximum possible shift is \\(2\\lambda_C = 0.00486\\) nm (at \\(\\theta = 180\\degree\\)).</p>
</div>
</div>

<h3>Special Angles</h3>

<ul>
<li>\\(\\theta = 0\\degree\\): \\(\\Delta\\lambda = 0\\). No scattering, no shift.</li>
<li>\\(\\theta = 90\\degree\\): \\(\\Delta\\lambda = h/(m_ec) = \\lambda_C = 0.00243\\) nm.</li>
<li>\\(\\theta = 180\\degree\\): \\(\\Delta\\lambda = 2h/(m_ec) = 2\\lambda_C = 0.00486\\) nm. Maximum shift.</li>
</ul>

<div class="env-block example">
<div class="env-title">Example: X-ray Compton Scattering at 90\u00b0</div>
<div class="env-body">
<p>An X-ray with \\(\\lambda = 0.0711\\) nm scatters off a free electron at \\(\\theta = 90\\degree\\).</p>
\\[\\Delta\\lambda = 0.00243(1 - \\cos 90\\degree) = 0.00243(1 - 0) = 0.00243 \\text{ nm}\\]
\\[\\lambda' = 0.0711 + 0.00243 = 0.0735 \\text{ nm}\\]
<p>The scattered photon has about 3.4% longer wavelength, and correspondingly 3.3% less energy. The missing energy went to the recoiling electron.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An X-ray photon with wavelength 0.050 nm scatters at 60\u00b0. What is the wavelength of the scattered photon?',
                        hint: 'Use \\(\\Delta\\lambda = \\lambda_C(1 - \\cos\\theta)\\) with \\(\\cos 60\\degree = 0.5\\).',
                        solution: '\\(\\Delta\\lambda = 0.00243(1 - 0.5) = 0.00122\\) nm. \\(\\lambda\' = 0.050 + 0.00122 = 0.05122\\) nm.'
                    },
                    {
                        question: 'What fraction of its energy does a 0.050 nm photon lose when back-scattered (\\(\\theta = 180\\degree\\))?',
                        hint: 'Calculate \\(\\lambda\'\\), then use \\(E \\propto 1/\\lambda\\) to find the energy ratio.',
                        solution: '\\(\\Delta\\lambda = 2 \\times 0.00243 = 0.00486\\) nm. \\(\\lambda\' = 0.05486\\) nm. The energy ratio is \\(E\'/E = \\lambda/\\lambda\' = 0.050/0.05486 = 0.911\\). The photon loses about 8.9% of its energy.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Wave-Particle Duality Begins
            // ============================================================
            {
                id: 'wave-particle-duality',
                title: 'Wave-Particle Duality Begins',
                content: `
<h2>Light Is Both Wave and Particle</h2>

<p>By 1923, the evidence was inescapable. Some experiments (diffraction, interference, polarization) reveal that light is a wave. Other experiments (photoelectric effect, Compton scattering) reveal that light is a particle. Neither picture alone is complete.</p>

<div class="env-block definition">
<div class="env-title">Definition: Wave-Particle Duality</div>
<div class="env-body">
<p><strong>Wave-particle duality</strong> is the principle that quantum entities (photons, electrons, atoms) exhibit both wave-like and particle-like behavior. Which aspect manifests depends on the experiment, but both aspects are always present in the underlying physics.</p>
</div>
</div>

<p>This duality is not a failure of our theories or a limitation of our knowledge. It is a fundamental feature of nature. Light is not "sometimes a wave, sometimes a particle." It is always both, a quantum object described by quantum mechanics. The wave and particle pictures are complementary descriptions that each capture part of the truth.</p>

<div class="env-block remark">
<div class="env-title">When does which picture dominate?</div>
<div class="env-body">
<p>As a rough guide:</p>
<ul>
<li><strong>Wave behavior</strong> is prominent when light propagates, diffracts, or interferes. These phenomena involve many photons acting collectively.</li>
<li><strong>Particle behavior</strong> is prominent when light is emitted or absorbed. These are single-photon events where energy \\(h\\nu\\) is exchanged all at once.</li>
</ul>
<p>But this is only a guide, not a rule. Single-photon interference experiments show that even individual photons exhibit wave behavior.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The coming revolution</div>
<div class="env-body">
<p>If light, which we always thought was a wave, also behaves as particles, could the reverse be true? Could particles, like electrons, also behave as waves? This is exactly what Louis de Broglie proposed in 1924, and it leads us to the next chapter.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'List one experiment that demonstrates the wave nature of light and one that demonstrates its particle nature. Explain what aspect each reveals.',
                        hint: 'Think about interference and the photoelectric effect.',
                        solution: 'Wave: Double-slit interference produces a pattern of bright and dark fringes, showing that light waves from two slits superpose and interfere constructively or destructively. This requires a wavelength and a coherent wave. Particle: The photoelectric effect shows a sharp frequency threshold and instantaneous emission, proving that light energy arrives in discrete packets (photons) of energy \\(h\\nu\\).'
                    },
                    {
                        question: 'Why was Compton scattering more convincing evidence for photons than the photoelectric effect?',
                        hint: 'Think about what conservation laws each demonstrates.',
                        solution: 'The photoelectric effect demonstrates that light delivers energy in quanta \\(h\\nu\\), but some physicists argued this could reflect properties of the absorbing material, not of light itself. Compton scattering shows conservation of both energy and momentum in individual photon-electron collisions, treating the photon as a particle with definite momentum \\(p = h/\\lambda\\). The quantitative prediction of the wavelength shift as a function of angle is impossible without the photon concept.'
                    }
                ]
            }
        ]
    });
})();
