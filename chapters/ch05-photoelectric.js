// === Chapter 5: The Photoelectric Effect ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch05',
        number: 5,
        title: 'The Photoelectric Effect',
        subtitle: 'Einstein proves that light comes in packets, and wins a Nobel Prize',
        file: 'ch05-photoelectric',

        sections: [
            // ============================================================
            // Section 0: Light Ejects Electrons
            // ============================================================
            {
                id: 'light-ejects-electrons',
                title: 'Light Ejects Electrons',
                content: `
<h2>Shining Light on Metal</h2>

<p>In 1887, Heinrich Hertz noticed something unexpected while generating radio waves. When ultraviolet light struck the metal electrodes in his apparatus, sparks jumped more easily. The light was somehow helping electricity flow. Subsequent experiments by Philipp Lenard (1902) revealed the full picture: when light shines on a clean metal surface, electrons are ejected from the metal. This is the <strong>photoelectric effect</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: The Photoelectric Effect</div>
<div class="env-body">
<p>The <strong>photoelectric effect</strong> is the emission of electrons from a material (usually a metal) when light of sufficiently high frequency strikes its surface. The ejected electrons are called <strong>photoelectrons</strong>.</p>
</div>
</div>

<p>The experimental setup is straightforward. A clean metal plate is placed in an evacuated tube. Light shines on it. A collector electrode nearby picks up any ejected electrons, producing a measurable current. By adjusting the voltage between the plate and collector, one can measure the maximum kinetic energy of the photoelectrons.</p>

<div class="env-block intuition">
<div class="env-title">What the experiment reveals</div>
<div class="env-body">
<p>Four key observations emerge from careful experiments:</p>
<ol>
<li>Electrons are ejected <em>only</em> if the light frequency exceeds a threshold \\(\\nu_0\\), regardless of intensity.</li>
<li>Above the threshold, increasing the light intensity increases the <em>number</em> of photoelectrons but not their maximum kinetic energy.</li>
<li>Increasing the frequency above \\(\\nu_0\\) increases the maximum kinetic energy of the photoelectrons.</li>
<li>Emission is essentially instantaneous (within \\(10^{-9}\\) seconds), even at very low intensities.</li>
</ol>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-photoelectric-showpiece"></div>
`,
                visualizations: [
                    {
                        id: 'viz-photoelectric-showpiece',
                        title: 'The Photoelectric Effect',
                        description: 'Adjust <strong>frequency</strong> (color of light) and <strong>intensity</strong>. Below the threshold frequency, no electrons are ejected regardless of brightness. Above threshold, electrons fly off with kinetic energy proportional to frequency. The graph on the right shows KE<sub>max</sub> vs frequency.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var freq = 7.0; // 10^14 Hz
                            var intensity = 5;
                            var workFunc = 2.0; // eV, for sodium-like metal
                            var freqThreshold = workFunc / (4.136e-15 * 1e14); // threshold in 10^14 Hz

                            VizEngine.createSlider(controls, 'Frequency (x10\u00b9\u2074 Hz)', 3.0, 12.0, freq, 0.1, function (v) { freq = v; });
                            VizEngine.createSlider(controls, 'Intensity', 1, 10, intensity, 1, function (v) { intensity = v; });

                            // Convert frequency to visible color
                            function freqToColor(f) {
                                // f in 10^14 Hz => wavelength in nm
                                var lam = 3e8 / (f * 1e14) * 1e9;
                                var r = 0, g = 0, b = 0;
                                if (lam >= 380 && lam < 440) { r = -(lam - 440) / 60; b = 1; }
                                else if (lam >= 440 && lam < 490) { g = (lam - 440) / 50; b = 1; }
                                else if (lam >= 490 && lam < 510) { g = 1; b = -(lam - 510) / 20; }
                                else if (lam >= 510 && lam < 580) { r = (lam - 510) / 70; g = 1; }
                                else if (lam >= 580 && lam < 645) { r = 1; g = -(lam - 645) / 65; }
                                else if (lam >= 645 && lam <= 780) { r = 1; }
                                else if (lam < 380) { r = 0.5; b = 1; } // UV shown as violet-ish
                                else { r = 0.8; } // IR shown as dark red

                                return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
                            }

                            // Photon particles for beam
                            var photons = [];
                            var electrons = [];
                            var metalX = w * 0.32;
                            var metalY1 = 50, metalY2 = h * 0.7;
                            var metalW = 12;
                            var emitTimer = 0;

                            // Graph region
                            var graphL = w * 0.58, graphR = w - 25, graphT = 30, graphB = h - 40;
                            var graphW = graphR - graphL, graphH = graphB - graphT;

                            var lastTime = performance.now();

                            function draw(now) {
                                var dt = Math.min((now - lastTime) / 1000, 0.03);
                                lastTime = now;

                                var aboveThreshold = freq > freqThreshold;
                                var photonEnergy = freq * 1e14 * 4.136e-15; // eV
                                var keMax = aboveThreshold ? (photonEnergy - workFunc) : 0;

                                // Spawn photons
                                emitTimer += dt;
                                var spawnRate = intensity * 8;
                                while (emitTimer > 1 / spawnRate) {
                                    emitTimer -= 1 / spawnRate;
                                    var py = metalY1 + Math.random() * (metalY2 - metalY1);
                                    photons.push({
                                        x: 15,
                                        y: py,
                                        vx: 180 + Math.random() * 60,
                                        life: 1
                                    });
                                }

                                // Update photons
                                for (var i = photons.length - 1; i >= 0; i--) {
                                    var ph = photons[i];
                                    ph.x += ph.vx * dt;
                                    if (ph.x >= metalX - 5) {
                                        // Hit metal: maybe emit electron
                                        if (aboveThreshold && Math.random() < 0.4) {
                                            var speed = 60 + keMax * 40;
                                            var angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
                                            electrons.push({
                                                x: metalX + metalW + 3,
                                                y: ph.y,
                                                vx: speed * Math.cos(angle) + 50,
                                                vy: speed * Math.sin(angle),
                                                life: 1
                                            });
                                        }
                                        photons.splice(i, 1);
                                    }
                                }

                                // Update electrons
                                for (var j = electrons.length - 1; j >= 0; j--) {
                                    var el = electrons[j];
                                    el.x += el.vx * dt;
                                    el.y += el.vy * dt;
                                    el.life -= dt * 0.6;
                                    if (el.life <= 0 || el.x > w * 0.52 || el.y < 0 || el.y > h) {
                                        electrons.splice(j, 1);
                                    }
                                }

                                // Draw
                                viz.clear();

                                // Light beam glow
                                var beamColor = freqToColor(freq);
                                var beamAlpha = intensity / 10 * 0.25;
                                ctx.fillStyle = beamColor;
                                ctx.globalAlpha = beamAlpha;
                                ctx.fillRect(10, metalY1, metalX - 10, metalY2 - metalY1);
                                ctx.globalAlpha = 1;

                                // Photons (wavy particles)
                                for (var pi = 0; pi < photons.length; pi++) {
                                    var pp = photons[pi];
                                    ctx.save();
                                    ctx.shadowColor = beamColor;
                                    ctx.shadowBlur = 8;
                                    ctx.fillStyle = beamColor;
                                    ctx.beginPath();
                                    ctx.arc(pp.x, pp.y, 3, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                }

                                // Metal surface
                                var metalGrad = ctx.createLinearGradient(metalX, 0, metalX + metalW, 0);
                                metalGrad.addColorStop(0, '#6a6a8a');
                                metalGrad.addColorStop(0.5, '#8a8aaa');
                                metalGrad.addColorStop(1, '#5a5a7a');
                                ctx.fillStyle = metalGrad;
                                ctx.fillRect(metalX, metalY1 - 10, metalW, metalY2 - metalY1 + 20);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(metalX, metalY1 - 10, metalW, metalY2 - metalY1 + 20);

                                viz.screenText('Metal', metalX + metalW / 2, metalY2 + 20, viz.colors.text, 10);

                                // Electrons
                                for (var ei = 0; ei < electrons.length; ei++) {
                                    var ee = electrons[ei];
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.blue;
                                    ctx.shadowBlur = 10;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.globalAlpha = ee.life;
                                    ctx.beginPath();
                                    ctx.arc(ee.x, ee.y, 3.5, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                    ctx.globalAlpha = 1;
                                }

                                // Status text
                                var statusY = h - 18;
                                if (aboveThreshold) {
                                    viz.screenText('Above threshold: electrons ejected! KEmax = ' + keMax.toFixed(2) + ' eV', w * 0.27, statusY, viz.colors.green, 11);
                                } else {
                                    viz.screenText('Below threshold: no electrons ejected (any intensity)', w * 0.27, statusY, viz.colors.red, 11);
                                }

                                // Frequency and energy info
                                viz.screenText('\u03BD = ' + freq.toFixed(1) + ' \u00d7 10\u00b9\u2074 Hz', 80, metalY1 - 25, beamColor, 11, 'left');
                                viz.screenText('E = ' + photonEnergy.toFixed(2) + ' eV', 80, metalY1 - 10, beamColor, 10, 'left');
                                viz.screenText('\u03C6 = ' + workFunc.toFixed(1) + ' eV', metalX + metalW + 5, metalY1 - 10, viz.colors.yellow, 10, 'left');

                                // ========= KE vs frequency graph =========
                                ctx.fillStyle = '#0a0a1a';
                                ctx.fillRect(graphL, graphT, graphW, graphH);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(graphL, graphT, graphW, graphH);

                                var fMin = 2, fMax = 14; // 10^14 Hz
                                var keMaxDisp = 5; // eV

                                // Grid
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                for (var gf = 4; gf <= 12; gf += 2) {
                                    var gfx = graphL + ((gf - fMin) / (fMax - fMin)) * graphW;
                                    ctx.beginPath(); ctx.moveTo(gfx, graphT); ctx.lineTo(gfx, graphB); ctx.stroke();
                                    viz.screenText(gf.toString(), gfx, graphB + 10, viz.colors.text, 9);
                                }
                                for (var gk = 1; gk <= 4; gk++) {
                                    var gky = graphB - (gk / keMaxDisp) * graphH;
                                    ctx.beginPath(); ctx.moveTo(graphL, gky); ctx.lineTo(graphR, gky); ctx.stroke();
                                    viz.screenText(gk.toString(), graphL - 10, gky, viz.colors.text, 9);
                                }

                                // Zero line for KE
                                var zeroY = graphB;

                                // Theoretical line: KE = h*freq - phi (above threshold)
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var lineStartF = freqThreshold;
                                var lineStartX = graphL + ((lineStartF - fMin) / (fMax - fMin)) * graphW;
                                ctx.moveTo(Math.max(lineStartX, graphL), zeroY);
                                for (var lf = lineStartF; lf <= fMax; lf += 0.1) {
                                    var lke = (lf * 1e14 * 4.136e-15) - workFunc;
                                    if (lke < 0) lke = 0;
                                    var lfx = graphL + ((lf - fMin) / (fMax - fMin)) * graphW;
                                    var lfy = graphB - (lke / keMaxDisp) * graphH;
                                    ctx.lineTo(lfx, Math.max(lfy, graphT));
                                }
                                ctx.stroke();

                                // Below threshold: zero line
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([5, 3]);
                                ctx.beginPath();
                                ctx.moveTo(graphL, zeroY);
                                ctx.lineTo(Math.min(lineStartX, graphR), zeroY);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Threshold marker
                                if (lineStartX > graphL && lineStartX < graphR) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(lineStartX, graphT); ctx.lineTo(lineStartX, graphB); ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('\u03BD\u2080', lineStartX, graphT - 8, viz.colors.yellow, 10);
                                }

                                // Current measurement point
                                var curFx = graphL + ((freq - fMin) / (fMax - fMin)) * graphW;
                                var curKE = Math.max(0, (freq * 1e14 * 4.136e-15) - workFunc);
                                var curFy = graphB - (curKE / keMaxDisp) * graphH;
                                if (curFx >= graphL && curFx <= graphR) {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.white;
                                    ctx.shadowBlur = 8;
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.beginPath();
                                    ctx.arc(curFx, Math.max(curFy, graphT), 5, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                }

                                // Axis labels
                                viz.screenText('Frequency (x10\u00b9\u2074 Hz)', graphL + graphW / 2, graphB + 28, viz.colors.text, 10);
                                ctx.save();
                                ctx.translate(graphL - 28, graphT + graphH / 2);
                                ctx.rotate(-Math.PI / 2);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('KEmax (eV)', 0, 0);
                                ctx.restore();

                                viz.screenText('KEmax vs \u03BD', graphL + graphW / 2, graphT - 10, viz.colors.white, 11);

                                // Intercept label
                                viz.screenText('slope = h', graphL + graphW * 0.7, graphT + 25, viz.colors.green, 10);
                                viz.screenText('intercept = \u2212\u03C6', graphL + graphW * 0.3, graphB - 15, viz.colors.orange, 10);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Set the frequency below threshold. Does increasing the intensity produce any electrons? Why is this impossible to explain classically?',
                        hint: 'Classically, brighter light means more energy delivered. What should happen?',
                        solution: 'No electrons are ejected regardless of intensity. Classically, more intense light delivers more energy to the surface, so electrons should eventually accumulate enough energy to escape. The existence of a sharp frequency threshold with no intensity dependence contradicts wave theory completely.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Classical Predictions Fail
            // ============================================================
            {
                id: 'classical-failure',
                title: 'Classical Predictions Fail',
                content: `
<h2>What Classical Wave Theory Predicts</h2>

<p>If light is a continuous wave (as Maxwell's electromagnetism says), then the energy carried by light depends on its intensity (amplitude squared), not its frequency. A classical wave theory of the photoelectric effect would predict:</p>

<ol>
<li><strong>Any frequency should work.</strong> Even dim red light, given enough time, should deliver enough energy to free an electron.</li>
<li><strong>Higher intensity should mean faster electrons.</strong> Brighter light carries more energy per unit time, so the ejected electrons should be faster.</li>
<li><strong>There should be a time delay.</strong> At low intensities, the wave needs time to deliver enough energy to a single electron. For very dim light, the delay could be seconds or minutes.</li>
</ol>

<div class="env-block warning">
<div class="env-title">Every classical prediction is wrong</div>
<div class="env-body">
<p>Experiments show the exact opposite:</p>
<ul>
<li>Below a threshold frequency, <em>no</em> electrons are emitted, no matter how intense the light.</li>
<li>Intensity affects the <em>number</em> of photoelectrons, not their kinetic energy.</li>
<li>Emission is <em>instantaneous</em>, even at extremely low intensities.</li>
</ul>
</div>
</div>

<h3>How Bad Is the Time-Delay Prediction?</h3>

<div class="env-block example">
<div class="env-title">Example: Classical Time Delay Estimate</div>
<div class="env-body">
<p>Consider light with intensity \\(I = 10^{-8}\\) W/m\\(^2\\) hitting a sodium atom with cross-section \\(A \\sim 10^{-19}\\) m\\(^2\\). The atom absorbs power \\(P = IA = 10^{-27}\\) W. To accumulate the work function energy \\(\\phi \\approx 2.3\\) eV \\(= 3.7 \\times 10^{-19}\\) J:</p>
\\[\\Delta t = \\frac{\\phi}{P} = \\frac{3.7 \\times 10^{-19}}{10^{-27}} = 3.7 \\times 10^8 \\text{ s} \\approx 12 \\text{ years}\\]
<p>Classically, an electron would need to "soak up" energy for 12 years. In reality, emission is instantaneous. Something is fundamentally wrong with the wave picture of energy delivery.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If light were a classical wave, what would happen if you used very intense infrared light instead of dim ultraviolet? Would electrons be ejected?',
                        hint: 'Think about the frequency threshold observation.',
                        solution: 'Classically, intense infrared should easily eject electrons because the total energy delivered per second is high. But experimentally, infrared (below the threshold frequency) never ejects electrons from sodium, no matter how intense. Only ultraviolet (above threshold) works. This is impossible to explain with classical waves, where energy depends on amplitude rather than frequency.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Einstein's Explanation
            // ============================================================
            {
                id: 'einstein-explanation',
                title: "Einstein's Explanation",
                content: `
<h2>Light Is Made of Photons</h2>

<p>In 1905, Albert Einstein proposed a radical explanation. He took Planck's idea of energy quantization seriously and applied it not to the oscillators in cavity walls, but to <em>light itself</em>. Light consists of individual packets of energy, which we now call <strong>photons</strong>.</p>

<div class="env-block theorem">
<div class="env-title">Einstein's Photoelectric Equation</div>
<div class="env-body">
\\[KE_{\\text{max}} = h\\nu - \\phi\\]
<p>Each photon carries energy \\(E = h\\nu\\). When a photon is absorbed by a metal surface, it transfers all its energy to a single electron. The electron uses \\(\\phi\\) (the <strong>work function</strong>) to escape the metal, and the remainder appears as kinetic energy.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Work Function</div>
<div class="env-body">
<p>The <strong>work function</strong> \\(\\phi\\) is the minimum energy required to remove an electron from the surface of a material. It depends on the material: sodium has \\(\\phi = 2.3\\) eV, copper has \\(\\phi = 4.7\\) eV, platinum has \\(\\phi = 6.4\\) eV.</p>
</div>
</div>

<h3>How This Explains Everything</h3>

<ul>
<li><strong>Threshold frequency:</strong> A photon must have energy \\(h\\nu \\geq \\phi\\) to free an electron. If \\(\\nu < \\phi/h\\), no single photon has enough energy, so no electrons are emitted. This gives \\(\\nu_0 = \\phi/h\\).</li>
<li><strong>Intensity affects number, not energy:</strong> Higher intensity means more photons per second, so more electrons are ejected. But each photon still has energy \\(h\\nu\\), so each ejected electron still has the same maximum kinetic energy.</li>
<li><strong>No time delay:</strong> A single photon delivers all its energy at once to a single electron. No accumulation needed.</li>
<li><strong>Linear KE vs frequency:</strong> \\(KE_{\\text{max}} = h\\nu - \\phi\\) is a straight line with slope \\(h\\) and y-intercept \\(-\\phi\\). This is exactly what the graph shows.</li>
</ul>

<div class="env-block remark">
<div class="env-title">Einstein won the Nobel Prize for this, not for relativity</div>
<div class="env-body">
<p>Einstein's 1921 Nobel Prize in Physics was awarded "for his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect." Although he is more famous for relativity, the Nobel committee recognized the photoelectric work because it was experimentally confirmed by Robert Millikan's precise measurements of the \\(KE_{\\text{max}}\\) vs \\(\\nu\\) line, yielding \\(h\\) to high accuracy.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Photoelectric Effect on Cesium</div>
<div class="env-body">
<p>Cesium has \\(\\phi = 2.1\\) eV. Light with wavelength 400 nm strikes the surface.</p>
\\[E_{\\text{photon}} = \\frac{hc}{\\lambda} = \\frac{(6.626 \\times 10^{-34})(3 \\times 10^8)}{400 \\times 10^{-9}} = 4.97 \\times 10^{-19} \\text{ J} = 3.1 \\text{ eV}\\]
\\[KE_{\\text{max}} = 3.1 - 2.1 = 1.0 \\text{ eV}\\]
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Light of wavelength 250 nm strikes a metal with work function 4.2 eV. (a) What is the photon energy? (b) Are electrons ejected? (c) If so, what is their maximum kinetic energy?',
                        hint: 'Use \\(E = hc/\\lambda\\), then compare with \\(\\phi\\).',
                        solution: '(a) \\(E = hc/\\lambda = (6.626 \\times 10^{-34})(3 \\times 10^8)/(250 \\times 10^{-9}) = 7.95 \\times 10^{-19}\\) J \\(= 4.97\\) eV. (b) Yes, because \\(4.97 > 4.2\\). (c) \\(KE_{\\text{max}} = 4.97 - 4.2 = 0.77\\) eV.'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Stopping Potential
            // ============================================================
            {
                id: 'stopping-potential',
                title: 'The Stopping Potential',
                content: `
<h2>Measuring Kinetic Energy with Voltage</h2>

<p>How do we measure the maximum kinetic energy of photoelectrons? We apply a <strong>reverse voltage</strong> (negative voltage) to the collector electrode, creating an electric field that opposes the motion of ejected electrons. As we increase this reverse voltage, fewer electrons have enough kinetic energy to reach the collector. At a critical voltage \\(V_0\\), called the <strong>stopping potential</strong>, even the fastest electrons are turned back, and the current drops to zero.</p>

<div class="env-block theorem">
<div class="env-title">Stopping Potential</div>
<div class="env-body">
\\[eV_0 = KE_{\\text{max}} = h\\nu - \\phi\\]
<p>where \\(e = 1.602 \\times 10^{-19}\\) C is the elementary charge. The stopping potential is proportional to frequency and independent of intensity.</p>
</div>
</div>

<p>This gives us a direct way to measure Planck's constant. Plotting \\(V_0\\) against \\(\\nu\\) gives a straight line with slope \\(h/e\\). Robert Millikan performed exactly this experiment in 1916, obtaining \\(h/e = 4.1 \\times 10^{-15}\\) V\\(\\cdot\\)s. Combined with his earlier measurement of \\(e\\), this confirmed Einstein's equation and yielded \\(h\\) to within 1% of the modern value.</p>

<div class="env-block example">
<div class="env-title">Example: Stopping Potential for Sodium</div>
<div class="env-body">
<p>Sodium (\\(\\phi = 2.3\\) eV) is illuminated by UV light with \\(\\nu = 8.0 \\times 10^{14}\\) Hz.</p>
\\[KE_{\\text{max}} = h\\nu - \\phi = (4.14 \\times 10^{-15})(8.0 \\times 10^{14}) - 2.3 = 3.31 - 2.3 = 1.01 \\text{ eV}\\]
\\[V_0 = \\frac{KE_{\\text{max}}}{e} = 1.01 \\text{ V}\\]
<p>A reverse voltage of 1.01 V will stop all photoelectrons.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Millikan tried to disprove Einstein</div>
<div class="env-body">
<p>Millikan spent years performing meticulous photoelectric experiments with the explicit goal of disproving Einstein's "reckless" photon hypothesis. Instead, his data confirmed the linear relationship perfectly. In his Nobel lecture (1923), Millikan admitted that Einstein's equation was "experimentally established" even though "the semicorpuscular theory by which Einstein arrived at his equation seems at present wholly untenable." Even direct experimental proof did not immediately convince everyone of the photon concept.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'In a photoelectric experiment with copper (\\(\\phi = 4.7\\) eV), what minimum frequency of light is needed to eject electrons? What is the corresponding wavelength?',
                        hint: 'At threshold, \\(h\\nu_0 = \\phi\\).',
                        solution: '\\(\\nu_0 = \\phi/h = 4.7/(4.14 \\times 10^{-15}) = 1.14 \\times 10^{15}\\) Hz. \\(\\lambda_0 = c/\\nu_0 = 3 \\times 10^8 / 1.14 \\times 10^{15} = 263\\) nm. This is in the ultraviolet, which is why copper does not eject electrons under visible light.'
                    },
                    {
                        question: 'If the stopping potential is 2.0 V when light of frequency \\(1.0 \\times 10^{15}\\) Hz is used, what is the work function of the metal?',
                        hint: 'Use \\(eV_0 = h\\nu - \\phi\\).',
                        solution: '\\(\\phi = h\\nu - eV_0 = (4.14 \\times 10^{-15})(1.0 \\times 10^{15}) - 2.0 = 4.14 - 2.0 = 2.14\\) eV. This is close to cesium or potassium.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Applications
            // ============================================================
            {
                id: 'applications',
                title: 'Applications',
                content: `
<h2>Photons at Work</h2>

<p>The photoelectric effect is not just a physics curiosity. It is the operating principle behind many important technologies.</p>

<h3>Solar Cells (Photovoltaics)</h3>

<p>A solar cell is essentially a photoelectric device. Photons from sunlight strike a semiconductor (typically silicon), exciting electrons across the band gap. The semiconductor's internal electric field then separates the charges, producing a voltage and current. Only photons with energy above the band gap (1.1 eV for silicon, corresponding to wavelengths below ~1100 nm) contribute; lower-energy infrared photons pass through without effect, exactly analogous to the threshold frequency.</p>

<h3>Photomultiplier Tubes</h3>

<p>In medical imaging, particle physics, and astronomy, photomultiplier tubes detect individual photons. A photon strikes a photocathode, ejecting one electron. This electron is accelerated into a series of <em>dynodes</em>, each of which releases several secondary electrons. After 10 stages, a single photon produces a cascade of \\(\\sim 10^6\\) electrons, enough to measure as a detectable electrical pulse.</p>

<h3>CCD and CMOS Sensors</h3>

<p>Digital cameras use the photoelectric effect in semiconductor pixels. Each pixel accumulates photoelectrons proportional to the light intensity. The number of electrons collected determines the pixel's brightness in the image. The sensitivity depends on the quantum efficiency: the fraction of incoming photons that successfully eject electrons.</p>

<div class="env-block remark">
<div class="env-title">Photoelectric effect in everyday life</div>
<div class="env-body">
<p>Automatic doors, smoke detectors, and night-vision goggles all rely on the photoelectric effect. Even your phone's ambient light sensor uses it. Every time your screen brightness adjusts automatically, quantum physics is at work.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Solar Cell Efficiency Limit</div>
<div class="env-body">
<p>A silicon solar cell has a band gap of 1.1 eV. Photons with \\(E > 1.1\\) eV are absorbed, but only 1.1 eV per photon is captured; the excess becomes heat. Photons with \\(E < 1.1\\) eV are wasted entirely. This fundamental tradeoff limits the maximum theoretical efficiency of a single-junction silicon cell to about 33% (the Shockley-Queisser limit).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A photomultiplier tube has a cesium photocathode (\\(\\phi = 2.1\\) eV). Can it detect red light (\\(\\lambda = 650\\) nm)? Blue light (\\(\\lambda = 450\\) nm)?',
                        hint: 'Calculate the photon energy \\(E = hc/\\lambda\\) and compare with \\(\\phi\\).',
                        solution: 'Red light: \\(E = hc/\\lambda = 1240/650 = 1.91\\) eV. Since \\(1.91 < 2.1\\), red light is below threshold. Blue light: \\(E = 1240/450 = 2.76\\) eV. Since \\(2.76 > 2.1\\), blue light ejects electrons. The tube can detect blue but not red photons.'
                    },
                    {
                        question: 'Why can a silicon solar cell (band gap 1.1 eV) absorb visible light but not radio waves?',
                        hint: 'Calculate the photon energy of visible light and radio waves.',
                        solution: 'Visible light photons have energies 1.8-3.1 eV, well above the 1.1 eV band gap. Radio waves (e.g., FM at 100 MHz) have photon energy \\(h\\nu = (4.14 \\times 10^{-15})(10^8) \\approx 4 \\times 10^{-7}\\) eV, far below the band gap. The photon energy is too small to excite an electron across the gap, so radio waves pass through silicon without being absorbed.'
                    }
                ]
            }
        ]
    });
})();
