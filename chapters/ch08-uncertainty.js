// === Chapter 8: The Uncertainty Principle ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch08',
        number: 8,
        title: 'The Uncertainty Principle',
        subtitle: 'Nature places a fundamental limit on what can be known simultaneously',
        file: 'ch08-uncertainty',

        sections: [
            // ============================================================
            // Section 0: You Can't Know Everything
            // ============================================================
            {
                id: 'cant-know-everything',
                title: "You Can't Know Everything",
                content: `
<h2>A Fundamental Limit</h2>

<p>In 1927, Werner Heisenberg discovered a principle that shattered the deterministic worldview of classical physics. It is not merely that our instruments are imprecise; nature itself forbids certain combinations of knowledge.</p>

<div class="env-block theorem">
<div class="env-title">Heisenberg's Uncertainty Principle</div>
<div class="env-body">
\\[\\Delta x \\, \\Delta p \\geq \\frac{\\hbar}{2}\\]
<p>where \\(\\Delta x\\) is the uncertainty in position, \\(\\Delta p\\) is the uncertainty in momentum, and \\(\\hbar = h/(2\\pi) = 1.055 \\times 10^{-34}\\) J\\(\\cdot\\)s is the reduced Planck constant.</p>
</div>
</div>

<p>This is not a statement about the limitations of measurement technology. It is a statement about the nature of reality. A particle cannot simultaneously possess a definite position and a definite momentum. The more precisely you know one, the less precisely you can know the other.</p>

<div class="env-block intuition">
<div class="env-title">Why this makes sense from wave mechanics</div>
<div class="env-body">
<p>Think of the electron's wave function. A wave with a perfectly defined wavelength (and therefore momentum \\(p = h/\\lambda\\)) extends over all space; it has no definite position at all. Conversely, a wave function localized to a tiny region (definite position) must be a superposition of many wavelengths, giving an uncertain momentum. You can have a pure tone that lasts forever, or a sharp click at one instant, but not a sound that is both a pure tone and an instantaneous click.</p>
</div>
</div>

<p>The key quantity \\(\\hbar/2 \\approx 5.3 \\times 10^{-35}\\) J\\(\\cdot\\)s is extraordinarily small. For macroscopic objects, this limit is irrelevant. But for electrons, atoms, and photons, it dominates their behavior.</p>

<div class="env-block example">
<div class="env-title">Example: Uncertainty for a Baseball vs an Electron</div>
<div class="env-body">
<p><strong>Baseball</strong> (\\(m = 0.145\\) kg) with position known to \\(\\Delta x = 1\\) mm:</p>
\\[\\Delta p \\geq \\frac{\\hbar}{2\\Delta x} = \\frac{1.055 \\times 10^{-34}}{2 \\times 10^{-3}} = 5.3 \\times 10^{-32} \\text{ kg m/s}\\]
\\[\\Delta v = \\frac{\\Delta p}{m} = \\frac{5.3 \\times 10^{-32}}{0.145} = 3.6 \\times 10^{-31} \\text{ m/s}\\]
<p>This is utterly negligible. The uncertainty principle places no practical constraint on baseballs.</p>

<p><strong>Electron</strong> (\\(m = 9.1 \\times 10^{-31}\\) kg) confined to \\(\\Delta x = 0.1\\) nm (atom-sized):</p>
\\[\\Delta p \\geq \\frac{1.055 \\times 10^{-34}}{2 \\times 10^{-10}} = 5.3 \\times 10^{-25} \\text{ kg m/s}\\]
\\[\\Delta v = \\frac{\\Delta p}{m} = \\frac{5.3 \\times 10^{-25}}{9.1 \\times 10^{-31}} = 5.8 \\times 10^5 \\text{ m/s}\\]
<p>The velocity uncertainty is enormous: hundreds of km/s. For an electron in an atom, quantum uncertainty is the dominant physics.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-uncertainty-showpiece"></div>
`,
                visualizations: [
                    {
                        id: 'viz-uncertainty-showpiece',
                        title: 'Single-Slit Diffraction & Uncertainty',
                        description: 'An electron beam passes through a single slit. A <strong>narrow slit</strong> (small \\(\\Delta x\\)) gives precise position knowledge, but the diffraction pattern spreads widely (large \\(\\Delta p\\)). A <strong>wide slit</strong> (large \\(\\Delta x\\)) gives a narrow diffraction pattern (small \\(\\Delta p\\)). Adjust the slit width to see \\(\\Delta x \\cdot \\Delta p \\geq \\hbar/2\\) in action.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var slitWidth = 30; // pixels (representing position uncertainty)
                            VizEngine.createSlider(controls, 'Slit Width (\u0394x)', 5, 80, slitWidth, 1, function (v) {
                                slitWidth = v;
                                dots = [];
                                dotCount = 0;
                            });

                            var clearBtn = VizEngine.createButton(controls, 'Clear', function () {
                                dots = [];
                                dotCount = 0;
                            });

                            // Layout
                            var slitX = w * 0.3;
                            var screenX = w * 0.7;
                            var centerY = h * 0.45;
                            var screenT = 25, screenB = h - 40;
                            var screenH = screenB - screenT;

                            var dots = [];
                            var dotCount = 0;
                            var maxDots = 3000;
                            var flyingElectrons = [];
                            var emitTimer = 0;
                            var lastTime = performance.now();

                            // Single slit diffraction: I(theta) = sinc^2(pi a sin(theta) / lambda)
                            // We map slit width to 'a' and use an effective wavelength
                            function diffractionProb(y) {
                                var yOff = y - centerY;
                                var L = screenX - slitX;
                                var sinTheta = yOff / Math.sqrt(yOff * yOff + L * L);
                                // Effective: wider slit => narrower pattern
                                var effLambda = 8; // pixels, effective wavelength
                                var arg = Math.PI * slitWidth * sinTheta / effLambda;
                                if (Math.abs(arg) < 0.001) return 1;
                                var sinc = Math.sin(arg) / arg;
                                return sinc * sinc;
                            }

                            function sampleY() {
                                for (var tries = 0; tries < 200; tries++) {
                                    var y = screenT + Math.random() * screenH;
                                    var prob = diffractionProb(y);
                                    if (Math.random() < prob) return y;
                                }
                                return centerY + (Math.random() - 0.5) * 20;
                            }

                            // Momentum spread indicator
                            function getMomentumSpread() {
                                // First minimum of single slit: sin(theta) = lambda/a
                                // dp/p ~ sin(theta_1) ~ lambda/a => spread inversely proportional to slit width
                                var effLambda = 8;
                                return effLambda / slitWidth;
                            }

                            function draw(now) {
                                var dt = Math.min((now - lastTime) / 1000, 0.03);
                                lastTime = now;

                                // Emit electrons
                                emitTimer += dt;
                                var rate = 40;
                                while (emitTimer > 1 / rate && dotCount < maxDots) {
                                    emitTimer -= 1 / rate;
                                    var finalY = sampleY();
                                    flyingElectrons.push({
                                        x: 10,
                                        y: centerY + (Math.random() - 0.5) * 10,
                                        targetY: finalY,
                                        vx: 400,
                                        phase: 'to-slit'
                                    });
                                }

                                // Update flying electrons
                                for (var i = flyingElectrons.length - 1; i >= 0; i--) {
                                    var el = flyingElectrons[i];
                                    el.x += el.vx * dt;

                                    if (el.phase === 'to-slit' && el.x >= slitX) {
                                        el.phase = 'to-screen';
                                        el.y = centerY + (Math.random() - 0.5) * slitWidth * 0.8;
                                    }

                                    if (el.phase === 'to-screen') {
                                        var frac = (el.x - slitX) / (screenX - slitX);
                                        el.y = VizEngine.lerp(el.y, el.targetY, frac * frac * 0.2);
                                    }

                                    if (el.x >= screenX) {
                                        if (dotCount < maxDots) {
                                            dots.push({ x: screenX + Math.random() * 2, y: el.targetY });
                                            dotCount++;
                                        }
                                        flyingElectrons.splice(i, 1);
                                    }
                                }

                                // Draw
                                viz.clear();

                                // Source
                                ctx.save();
                                ctx.shadowColor = viz.colors.teal;
                                ctx.shadowBlur = 10;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(15, centerY, 5, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                                viz.screenText('e\u207b beam', 15, centerY + 16, viz.colors.teal, 9);

                                // Slit barrier
                                ctx.fillStyle = '#3a3a5a';
                                ctx.fillRect(slitX - 3, screenT, 6, centerY - slitWidth / 2 - screenT);
                                ctx.fillRect(slitX - 3, centerY + slitWidth / 2, 6, screenB - centerY - slitWidth / 2);

                                // Slit opening glow
                                ctx.fillStyle = 'rgba(63,185,160,0.25)';
                                ctx.fillRect(slitX - 3, centerY - slitWidth / 2, 6, slitWidth);

                                // Slit width indicator
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(slitX + 10, centerY - slitWidth / 2);
                                ctx.lineTo(slitX + 10, centerY + slitWidth / 2);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(slitX + 7, centerY - slitWidth / 2);
                                ctx.lineTo(slitX + 13, centerY - slitWidth / 2);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(slitX + 7, centerY + slitWidth / 2);
                                ctx.lineTo(slitX + 13, centerY + slitWidth / 2);
                                ctx.stroke();
                                viz.screenText('\u0394x', slitX + 22, centerY, viz.colors.yellow, 11);

                                // Detection screen
                                ctx.fillStyle = '#080818';
                                ctx.fillRect(screenX, screenT, w - screenX - 10, screenH);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(screenX, screenT, w - screenX - 10, screenH);

                                // Accumulated dots
                                for (var d = 0; d < dots.length; d++) {
                                    ctx.fillStyle = 'rgba(63,185,160,0.75)';
                                    ctx.fillRect(dots[d].x, dots[d].y - 0.5, 1.5, 1.5);
                                }

                                // Flying electrons
                                for (var fi = 0; fi < flyingElectrons.length; fi++) {
                                    var fe = flyingElectrons[fi];
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.blue;
                                    ctx.shadowBlur = 6;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.arc(fe.x, fe.y, 2, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.restore();
                                }

                                // Theoretical pattern curve
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.globalAlpha = 0.6;
                                ctx.beginPath();
                                for (var py = screenT; py <= screenB; py++) {
                                    var prob = diffractionProb(py);
                                    var px = screenX + prob * (w - screenX - 15) * 0.8;
                                    if (py === screenT) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                ctx.globalAlpha = 1;

                                // Momentum spread indicator bar
                                var momSpread = getMomentumSpread();
                                var barL = 20, barR = slitX - 30;
                                var barY = h - 25;
                                var barW = barR - barL;

                                ctx.fillStyle = '#111133';
                                ctx.fillRect(barL, barY - 8, barW, 16);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 0.5;
                                ctx.strokeRect(barL, barY - 8, barW, 16);

                                var fillW = VizEngine.clamp(momSpread * 2, 0, 1) * barW;
                                var momColor = VizEngine.hsl(200 - momSpread * 300, 80, 50);
                                ctx.fillStyle = momColor;
                                ctx.fillRect(barL, barY - 6, fillW, 12);

                                viz.screenText('\u0394p (momentum spread)', barL + barW / 2, barY - 16, viz.colors.text, 10);

                                // Quantitative display
                                var dispX = slitX + 50, dispY = h - 18;
                                var dxNorm = slitWidth / 80;
                                var dpNorm = momSpread;
                                var product = dxNorm * dpNorm;
                                viz.screenText('\u0394x \u00d7 \u0394p \u2265 \u0127/2', dispX + 80, dispY, viz.colors.white, 11);

                                // Qualitative state
                                if (slitWidth < 15) {
                                    viz.screenText('Narrow slit: position known, momentum very uncertain', w / 2, screenT - 10, viz.colors.orange, 10);
                                } else if (slitWidth > 60) {
                                    viz.screenText('Wide slit: momentum known, position very uncertain', w / 2, screenT - 10, viz.colors.teal, 10);
                                } else {
                                    viz.screenText('Intermediate: moderate uncertainty in both', w / 2, screenT - 10, viz.colors.text, 10);
                                }

                                viz.screenText('Electrons: ' + dotCount, screenX + (w - screenX - 10) / 2, screenB + 12, viz.colors.text, 10);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Make the slit very narrow, then very wide. How does the pattern on the screen change? Relate this to \\(\\Delta x\\) and \\(\\Delta p\\).',
                        hint: 'Narrow slit = small \\(\\Delta x\\). What happens to the diffraction pattern width?',
                        solution: 'Narrow slit (small \\(\\Delta x\\)): the electron\'s position is well-known as it passes through the slit, but the diffraction pattern on the screen is very broad, meaning the electron could arrive almost anywhere (large \\(\\Delta p_y\\)). Wide slit (large \\(\\Delta x\\)): position is poorly known, but the diffraction pattern is narrow (small \\(\\Delta p_y\\)). This is the uncertainty principle in action: \\(\\Delta x \\cdot \\Delta p \\geq \\hbar/2\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Delta x Delta p >= hbar/2
            // ============================================================
            {
                id: 'position-momentum',
                title: '\u0394x\u0394p \u2265 \u0127/2',
                content: `
<h2>The Mathematical Statement</h2>

<p>The uncertainty principle is not an approximation or a hand-waving argument. It is a rigorous mathematical theorem derivable from the wave mechanics of quantum theory. The proof follows from the properties of Fourier transforms: a function and its Fourier transform cannot both be sharply peaked.</p>

<div class="env-block theorem">
<div class="env-title">Heisenberg Uncertainty Principle (Precise Statement)</div>
<div class="env-body">
<p>For any quantum state, the standard deviations of position and momentum satisfy:</p>
\\[\\sigma_x \\, \\sigma_p \\geq \\frac{\\hbar}{2}\\]
<p>where \\(\\sigma_x = \\sqrt{\\langle x^2 \\rangle - \\langle x \\rangle^2}\\) and \\(\\sigma_p = \\sqrt{\\langle p^2 \\rangle - \\langle p \\rangle^2}\\) are the standard deviations (root-mean-square spreads) of position and momentum measurements.</p>
</div>
</div>

<p>The equality \\(\\sigma_x \\sigma_p = \\hbar/2\\) is achieved only by Gaussian wave packets. All other wave functions have strictly greater uncertainty products.</p>

<h3>What Counts as "Uncertainty"?</h3>

<p>The uncertainties \\(\\Delta x\\) and \\(\\Delta p\\) are <em>not</em> measurement errors. They are the intrinsic spreads in the outcomes of position and momentum measurements on identically prepared quantum states. If you prepare many identical copies of a quantum system and measure position on some copies and momentum on others, you will get a distribution of values for each. \\(\\Delta x\\) and \\(\\Delta p\\) are the widths of these distributions.</p>

<div class="env-block warning">
<div class="env-title">Common misconception</div>
<div class="env-body">
<p>"The uncertainty principle means our measuring instruments disturb the particle." While Heisenberg's original argument used a thought experiment involving a gamma-ray microscope (where the photon used to observe the electron kicks it), the uncertainty principle is far more fundamental than measurement disturbance. Even with perfect instruments, the principle holds. It is a property of quantum states, not of measurements.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Minimum Uncertainty State</div>
<div class="env-body">
<p>A Gaussian wave packet \\(\\Psi(x) \\propto e^{-x^2/(4\\sigma_x^2)}\\) has \\(\\sigma_x\\) and \\(\\sigma_p = \\hbar/(2\\sigma_x)\\), giving \\(\\sigma_x \\sigma_p = \\hbar/2\\) (the minimum). For \\(\\sigma_x = 0.1\\) nm:</p>
\\[\\sigma_p = \\frac{1.055 \\times 10^{-34}}{2 \\times 10^{-10}} = 5.28 \\times 10^{-25} \\text{ kg m/s}\\]
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An electron is confined to a region of size \\(\\Delta x = 0.05\\) nm (smaller than a hydrogen atom). What is the minimum uncertainty in its velocity?',
                        hint: 'Use \\(\\Delta p \\geq \\hbar/(2\\Delta x)\\), then \\(\\Delta v = \\Delta p / m\\).',
                        solution: '\\(\\Delta p \\geq \\hbar/(2 \\times 0.05 \\times 10^{-9}) = 1.055 \\times 10^{-34}/(10^{-10}) = 1.055 \\times 10^{-24}\\) kg m/s. \\(\\Delta v = \\Delta p/m = 1.055 \\times 10^{-24}/(9.1 \\times 10^{-31}) = 1.16 \\times 10^6\\) m/s. The electron buzzes around at over a million meters per second, simply because it is confined to a small region.'
                    },
                    {
                        question: 'A proton (\\(m = 1.67 \\times 10^{-27}\\) kg) is confined to a nucleus of radius \\(\\Delta x \\approx 10^{-15}\\) m. Estimate the minimum kinetic energy of the proton.',
                        hint: 'Find \\(\\Delta p\\), then compute \\(KE = (\\Delta p)^2/(2m)\\).',
                        solution: '\\(\\Delta p \\geq \\hbar/(2 \\times 10^{-15}) = 5.28 \\times 10^{-20}\\) kg m/s. \\(KE \\approx (\\Delta p)^2/(2m) = (5.28 \\times 10^{-20})^2/(2 \\times 1.67 \\times 10^{-27}) = 8.3 \\times 10^{-13}\\) J \\(\\approx 5.2\\) MeV. This is the right order of magnitude for nuclear binding energies, showing that the uncertainty principle governs nuclear physics.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Single-Slit Demonstration
            // ============================================================
            {
                id: 'single-slit',
                title: 'Single-Slit Demonstration',
                content: `
<h2>The Uncertainty Principle in Action</h2>

<p>The single-slit diffraction experiment provides the most direct physical demonstration of the uncertainty principle. An electron beam passes through a slit of width \\(a\\). At the slit, the electron's transverse position is known to within \\(\\Delta x \\approx a\\). By the uncertainty principle, its transverse momentum must be uncertain by at least \\(\\Delta p_y \\geq \\hbar/(2a)\\).</p>

<div class="env-block theorem">
<div class="env-title">Single-Slit Diffraction and Uncertainty</div>
<div class="env-body">
<p>For a single slit of width \\(a\\), the first diffraction minimum occurs at angle:</p>
\\[\\sin\\theta_1 = \\frac{\\lambda}{a}\\]
<p>The transverse momentum spread is \\(\\Delta p_y \\approx p \\sin\\theta_1 = p\\lambda/a = h/a\\). Therefore:</p>
\\[\\Delta x \\cdot \\Delta p_y \\approx a \\cdot \\frac{h}{a} = h\\]
<p>which is on the order of \\(\\hbar\\), confirming the uncertainty principle. (The precise calculation with standard deviations gives exactly \\(\\hbar/2\\) for the minimum.)</p>
</div>
</div>

<h3>The Inverse Relationship</h3>

<p>The key point is the inverse relationship between slit width and diffraction spread:</p>

<ul>
<li><strong>Narrow slit</strong> (small \\(a\\)): position well-determined, pattern spreads widely (large momentum uncertainty).</li>
<li><strong>Wide slit</strong> (large \\(a\\)): position poorly determined, pattern stays narrow (small momentum uncertainty).</li>
</ul>

<p>You cannot win. Trying to pin down the position more precisely (narrower slit) inevitably increases the momentum uncertainty (wider diffraction pattern). This tradeoff is not a practical limitation but a law of nature.</p>

<div class="env-block example">
<div class="env-title">Example: Narrowing the Slit</div>
<div class="env-body">
<p>An electron beam (\\(\\lambda = 0.1\\) nm) passes through a slit of width \\(a = 1\\) nm. The angular spread to the first minimum is:</p>
\\[\\sin\\theta_1 = \\frac{0.1}{1} = 0.1 \\quad \\Rightarrow \\quad \\theta_1 \\approx 5.7\\degree\\]
<p>Now halve the slit to \\(a = 0.5\\) nm:</p>
\\[\\sin\\theta_1 = \\frac{0.1}{0.5} = 0.2 \\quad \\Rightarrow \\quad \\theta_1 \\approx 11.5\\degree\\]
<p>The diffraction angle doubled. We gained a factor of 2 in position knowledge but lost the same factor in momentum knowledge.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A beam of neutrons (\\(\\lambda = 0.2\\) nm) passes through a slit of width 0.4 nm. What is the angular spread (angle to first minimum) of the diffraction pattern?',
                        hint: 'Use \\(\\sin\\theta_1 = \\lambda/a\\).',
                        solution: '\\(\\sin\\theta_1 = 0.2/0.4 = 0.5\\), so \\(\\theta_1 = 30\\degree\\). This is a very wide spread, showing that confining neutrons to a 0.4 nm slit introduces large transverse momentum uncertainty.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Energy-Time Uncertainty
            // ============================================================
            {
                id: 'energy-time',
                title: 'Energy-Time Uncertainty',
                content: `
<h2>The Other Uncertainty Relation</h2>

<p>There is a second uncertainty relation, analogous to position-momentum but involving energy and time:</p>

<div class="env-block theorem">
<div class="env-title">Energy-Time Uncertainty</div>
<div class="env-body">
\\[\\Delta E \\, \\Delta t \\geq \\frac{\\hbar}{2}\\]
<p>where \\(\\Delta E\\) is the uncertainty in energy and \\(\\Delta t\\) is the time interval over which the energy measurement is made (or the lifetime of a quantum state).</p>
</div>
</div>

<p>This relation is subtly different from position-momentum uncertainty because time is not an observable in quantum mechanics (it is a parameter, not an operator). The interpretation is:</p>

<ul>
<li>A quantum state that exists for only a short time \\(\\Delta t\\) has an inherent energy uncertainty \\(\\Delta E \\geq \\hbar/(2\\Delta t)\\).</li>
<li>Measuring the energy of a system to precision \\(\\Delta E\\) requires a measurement time of at least \\(\\Delta t \\geq \\hbar/(2\\Delta E)\\).</li>
</ul>

<h3>Natural Line Widths</h3>

<p>An excited atom has a finite lifetime \\(\\tau\\) before it decays by emitting a photon. The emitted photon's energy (and thus frequency) is not perfectly sharp; it has a natural width \\(\\Delta\\nu \\sim 1/(2\\pi\\tau)\\). Short-lived excited states produce broad spectral lines; long-lived states produce narrow lines.</p>

<div class="env-block example">
<div class="env-title">Example: Spectral Line Width</div>
<div class="env-body">
<p>An excited state of hydrogen has a lifetime \\(\\tau = 10^{-8}\\) s. The energy uncertainty is:</p>
\\[\\Delta E \\geq \\frac{\\hbar}{2\\tau} = \\frac{1.055 \\times 10^{-34}}{2 \\times 10^{-8}} = 5.3 \\times 10^{-27} \\text{ J} = 3.3 \\times 10^{-8} \\text{ eV}\\]
<p>For a photon at 656 nm (H-alpha), this gives a natural frequency width of \\(\\Delta\\nu = \\Delta E/h \\approx 8\\) MHz, far smaller than the Doppler broadening at room temperature. But it sets a fundamental minimum width that no amount of cooling can reduce.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Virtual particles</div>
<div class="env-body">
<p>Energy-time uncertainty has a spectacular consequence in quantum field theory: "virtual particles" can borrow energy \\(\\Delta E\\) from the vacuum for a time \\(\\Delta t \\sim \\hbar/\\Delta E\\). This is not metaphorical. Virtual particle-antiparticle pairs constantly pop into and out of existence everywhere in space. Their effects are measurable (e.g., the Lamb shift, the Casimir effect), confirming that the energy-time uncertainty principle applies even to the vacuum.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A nuclear excited state has a lifetime of \\(10^{-12}\\) s. What is the minimum energy width of the gamma-ray photon it emits?',
                        hint: 'Use \\(\\Delta E \\geq \\hbar/(2\\Delta t)\\).',
                        solution: '\\(\\Delta E \\geq 1.055 \\times 10^{-34}/(2 \\times 10^{-12}) = 5.3 \\times 10^{-23}\\) J \\(= 3.3 \\times 10^{-4}\\) eV. Nuclear gamma-ray lines are much broader (in absolute energy terms) than atomic spectral lines because nuclear lifetimes are shorter.'
                    },
                    {
                        question: 'The W boson has a mass of 80 GeV and a lifetime of about \\(3 \\times 10^{-25}\\) s. Estimate the uncertainty in its mass-energy.',
                        hint: 'Use \\(\\Delta E \\geq \\hbar/(2\\Delta t)\\).',
                        solution: '\\(\\Delta E \\geq 1.055 \\times 10^{-34}/(2 \\times 3 \\times 10^{-25}) = 1.76 \\times 10^{-10}\\) J \\(\\approx 1.1\\) GeV. This is about 1.4% of its rest energy. The W boson does not have a perfectly sharp mass; experiments measure a width of about 2.1 GeV, consistent with the uncertainty principle.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Philosophical Implications
            // ============================================================
            {
                id: 'philosophical-implications',
                title: 'Philosophical Implications',
                content: `
<h2>The End of Determinism</h2>

<p>The uncertainty principle has profound philosophical consequences. In classical physics (Newton, Maxwell), if you know the exact positions and momenta of all particles at one instant, you can (in principle) predict the future of the entire universe. This is <strong>determinism</strong>: the future is completely determined by the present.</p>

<p>Heisenberg's uncertainty principle destroys this picture. You <em>cannot</em> know the exact positions and momenta of all particles, not because of technological limitations, but because these quantities do not simultaneously have definite values. Without definite initial conditions, deterministic prediction is impossible in principle.</p>

<div class="env-block remark">
<div class="env-title">Einstein vs. Bohr</div>
<div class="env-body">
<p>This troubled Einstein deeply. He spent years devising thought experiments to circumvent the uncertainty principle, each of which Niels Bohr refuted. Their debates at the Solvay Conferences (1927, 1930) are legendary. Einstein's position: "God does not play dice." Bohr's reply: "Stop telling God what to do." History sided with Bohr; no experiment has ever violated the uncertainty principle.</p>
</div>
</div>

<h3>What Uncertainty Does Not Mean</h3>

<p>Several common misinterpretations should be avoided:</p>

<ul>
<li><strong>Not just measurement disturbance.</strong> The principle is not about clumsily knocking particles around with measuring instruments. It holds even in gedankenexperiments with ideal instruments.</li>
<li><strong>Not due to ignorance.</strong> The electron does not secretly have a definite position and momentum that we simply fail to measure. The quantities genuinely do not have simultaneous definite values (Bell's theorem, tested experimentally, rules out "hidden variable" theories of this kind).</li>
<li><strong>Not a license for anything.</strong> "Quantum uncertainty" does not mean "anything is possible." The uncertainty principle is a precise mathematical inequality. It tells you exactly what combinations of knowledge are forbidden and what are allowed.</li>
</ul>

<div class="env-block intuition">
<div class="env-title">A new picture of reality</div>
<div class="env-body">
<p>At the quantum level, the world is not made of tiny billiard balls following precise trajectories. It is made of wave functions, probability amplitudes, and superpositions. The uncertainty principle is not an annoying limitation; it is a window into the true nature of matter. Without it, atoms would collapse (electrons would spiral into nuclei), chemistry would not exist, and neither would we.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Why Atoms Don't Collapse</div>
<div class="env-body">
<p>Classically, an electron orbiting a nucleus should radiate energy and spiral inward. Why doesn't it? Because confining the electron closer to the nucleus (smaller \\(\\Delta x\\)) increases its momentum uncertainty (larger \\(\\Delta p\\)), which increases its kinetic energy. At some point, the kinetic energy cost of further confinement exceeds the potential energy gain. The atom reaches an equilibrium size, approximately the Bohr radius (0.053 nm). The uncertainty principle literally holds matter together.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Estimate the ground-state energy of a hydrogen atom using the uncertainty principle. Assume the electron is confined to a region of size \\(r\\), and minimize the total energy \\(E = \\Delta p^2/(2m) - e^2/(4\\pi\\epsilon_0 r)\\) with respect to \\(r\\).',
                        hint: 'Set \\(\\Delta p \\approx \\hbar/r\\), write \\(E(r)\\), take \\(dE/dr = 0\\).',
                        solution: 'With \\(\\Delta p \\approx \\hbar/r\\): \\(E(r) = \\hbar^2/(2mr^2) - e^2/(4\\pi\\epsilon_0 r)\\). Setting \\(dE/dr = -\\hbar^2/(mr^3) + e^2/(4\\pi\\epsilon_0 r^2) = 0\\), we get \\(r = 4\\pi\\epsilon_0 \\hbar^2/(me^2) = a_0 = 0.053\\) nm (the Bohr radius). Substituting back: \\(E = -me^4/(32\\pi^2\\epsilon_0^2\\hbar^2) = -13.6\\) eV. This matches the exact quantum mechanical result, showing that the ground-state energy is essentially determined by the uncertainty principle.'
                    },
                    {
                        question: 'Why can the uncertainty principle be ignored when describing the motion of a car but not the motion of an electron?',
                        hint: 'Compare the magnitude of \\(\\hbar/2\\) to the typical values of \\(\\Delta x \\cdot \\Delta p\\) for each.',
                        solution: 'For a car (\\(m \\sim 1000\\) kg, \\(v \\sim 30\\) m/s), even crude knowledge of position (\\(\\Delta x \\sim 0.01\\) m) and momentum (\\(\\Delta p \\sim 1\\) kg m/s) gives \\(\\Delta x \\cdot \\Delta p \\sim 0.01\\) J\\(\\cdot\\)s, which is \\(10^{32}\\) times larger than \\(\\hbar/2\\). The uncertainty principle is satisfied with enormous room to spare. For an electron in an atom (\\(\\Delta x \\sim 10^{-10}\\) m, \\(\\Delta p \\sim 10^{-24}\\) kg m/s), \\(\\Delta x \\cdot \\Delta p \\sim 10^{-34}\\) J\\(\\cdot\\)s, right at the uncertainty limit. The quantum constraint dominates the physics.'
                    }
                ]
            }
        ]
    });
})();
