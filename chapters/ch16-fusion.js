// === Chapter 16: Nuclear Fusion ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch16',
        number: 16,
        title: 'Nuclear Fusion',
        subtitle: 'The power source of the stars, and humanity\'s greatest energy quest',
        file: 'ch16-fusion',

        sections: [
            // ============================================================
            // Section 0: Fusing Light Nuclei
            // ============================================================
            {
                id: 'fusing-light',
                title: 'Fusing Light Nuclei',
                content: `
<h2>Building Heavier from Lighter</h2>

<p>Fusion is the reverse of fission: instead of splitting a heavy nucleus, you merge two light nuclei into a heavier one. Just as fission releases energy by moving down the binding energy curve from the heavy side, fusion releases energy by moving up from the light side toward iron.</p>

<div class="env-block definition">
<div class="env-title">Definition: Nuclear Fusion</div>
<div class="env-body">
<p><strong>Nuclear fusion</strong> is the process in which two light nuclei combine to form a heavier nucleus, releasing energy. Fusion powers every star in the universe.</p>
</div>
</div>

<p>The simplest and most important fusion reaction combines hydrogen isotopes:</p>

\\[{}^2_1\\text{H} + {}^3_1\\text{H} \\rightarrow {}^4_2\\text{He} + n + 17.6\\,\\text{MeV}\\]

<p>This deuterium-tritium (D-T) reaction is the most promising for fusion power on Earth because it has the highest reaction rate at achievable temperatures.</p>

<div class="env-block intuition">
<div class="env-title">Why fusion releases more energy per kilogram than fission</div>
<div class="env-body">
<p>The binding energy per nucleon jumps dramatically from hydrogen (0 MeV) to helium (7.1 MeV), but only changes modestly from uranium (7.6 MeV) to the fission products (8.5 MeV). Per nucleon, fusion extracts a larger fraction of the available nuclear energy. And hydrogen is far lighter than uranium, so 1 kg of fusion fuel produces more energy than 1 kg of fission fuel.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Energy from 1 kg of D-T fuel</div>
<div class="env-body">
<p>The D-T reaction releases 17.6 MeV per reaction, involving 5 nucleons total. Energy per nucleon: \\(17.6/5 = 3.5\\,\\text{MeV}\\). For 1 kg of fuel (\\(\\approx 6 \\times 10^{23}/5 \\times 1000 = 1.2 \\times 10^{26}\\) reactions):</p>
\\[E \\approx 1.2 \\times 10^{26} \\times 17.6 \\times 1.6 \\times 10^{-13}\\,\\text{J} \\approx 3.4 \\times 10^{14}\\,\\text{J}\\]
<p>That is about 340 TJ, roughly four times the energy from fissioning 1 kg of U-235.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Calculate the mass defect for the D-T fusion reaction. Deuterium mass: 2.01410 u, Tritium mass: 3.01605 u, He-4 mass: 4.00260 u, neutron mass: 1.00866 u.',
                        hint: 'Mass defect = (mass of reactants) - (mass of products).',
                        solution: '\\(\\Delta m = (2.01410 + 3.01605) - (4.00260 + 1.00866) = 5.03015 - 5.01126 = 0.01889\\,\\text{u}\\). Energy: \\(0.01889 \\times 931.5 = 17.6\\,\\text{MeV}\\), consistent with the stated value.'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Coulomb Barrier
            // ============================================================
            {
                id: 'coulomb-barrier',
                title: 'The Coulomb Barrier',
                content: `
<h2>The Wall Between Nuclei</h2>

<p>For fusion to occur, two positively charged nuclei must be brought close enough for the short-range strong nuclear force to take over and bind them. But at large distances, the electromagnetic repulsion between the two positive charges creates an enormous energy barrier.</p>

<div class="env-block definition">
<div class="env-title">Definition: Coulomb Barrier</div>
<div class="env-body">
<p>The <strong>Coulomb barrier</strong> is the electrostatic potential energy that two nuclei must overcome (or tunnel through) to get close enough for fusion. For two nuclei with charges \\(Z_1 e\\) and \\(Z_2 e\\):</p>
\\[U_C = \\frac{Z_1 Z_2 e^2}{4\\pi \\varepsilon_0 r}\\]
<p>At nuclear contact distance (\\(r \\approx 2\\,\\text{fm}\\)), this is about 0.7 MeV for two protons, far higher than the average thermal energy at ordinary temperatures.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-coulomb-barrier"></div>

<h3>How Stars Overcome the Barrier</h3>

<p>At the core of the Sun, the temperature is about \\(1.5 \\times 10^7\\,\\text{K}\\). The average thermal energy is:</p>
\\[\\langle E \\rangle = \\frac{3}{2} k_B T \\approx \\frac{3}{2} \\times 1.38 \\times 10^{-23} \\times 1.5 \\times 10^7 \\approx 1.9\\,\\text{keV}\\]

<p>This is far less than the Coulomb barrier of \\(\\sim 700\\,\\text{keV}\\). So how does fusion happen at all?</p>

<div class="env-block theorem">
<div class="env-title">Quantum Tunneling</div>
<div class="env-body">
<p>Quantum mechanics allows particles to "tunnel" through energy barriers that would be classically impassable. The probability is exponentially small, but the Sun contains an enormous number of protons (\\(\\sim 10^{57}\\)), and they collide billions of times per second. Even a tiny tunneling probability per collision, multiplied by the sheer number of attempts, produces a steady fusion rate.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The Gamow peak</div>
<div class="env-body">
<p>Only particles in the high-energy tail of the Maxwell-Boltzmann distribution have a significant tunneling probability. The fusion rate is determined by the "Gamow peak," the narrow energy window where the product of the Maxwell-Boltzmann tail (decreasing with energy) and the tunneling probability (increasing with energy) is maximized.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-coulomb-barrier',
                        title: 'Proton Fusion: Overcoming the Coulomb Barrier',
                        description: 'Two protons approach each other. At low temperature, the Coulomb repulsion pushes them apart. Increase the temperature to give them enough kinetic energy to tunnel through the barrier and fuse, releasing a flash of energy.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var temperature = 5; // millions of K
                            var simState = 'approaching'; // 'approaching', 'repelled', 'tunneling', 'fused'
                            var simTime = 0;
                            var proton1X = w * 0.15, proton2X = w * 0.85;
                            var centerY = h * 0.42;
                            var protonR = 16;
                            var speed1 = 0, speed2 = 0;
                            var flashAlpha = 0;
                            var fusedTime = 0;

                            // Potential energy curve
                            var peGraphT = h * 0.68, peGraphB = h - 15;
                            var peGraphL = 40, peGraphR = w - 30;

                            VizEngine.createSlider(controls, 'T (million K)', 1, 20, 5, 0.5, function (v) {
                                temperature = v;
                            });

                            VizEngine.createButton(controls, 'Launch!', function () {
                                simState = 'approaching';
                                simTime = 0;
                                flashAlpha = 0;
                                fusedTime = 0;
                                proton1X = w * 0.15;
                                proton2X = w * 0.85;
                                var baseSpeed = 0.8 + temperature * 0.15;
                                speed1 = baseSpeed;
                                speed2 = -baseSpeed;
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                simState = 'approaching';
                                simTime = 0;
                                flashAlpha = 0;
                                fusedTime = 0;
                                proton1X = w * 0.15;
                                proton2X = w * 0.85;
                                speed1 = 0;
                                speed2 = 0;
                            });

                            function draw(now) {
                                viz.clear();
                                var t = now / 1000;
                                simTime += 1 / 60;

                                var midX = w / 2;
                                var separation = proton2X - proton1X;

                                if (simState === 'approaching') {
                                    if (separation > protonR * 2 + 2) {
                                        // Coulomb repulsion force (stronger at close range)
                                        var force = separation > 10 ? 500 / (separation * separation) : 0;
                                        speed1 -= force;
                                        speed2 += force;

                                        proton1X += speed1;
                                        proton2X += speed2;
                                    }

                                    if (separation <= protonR * 2 + 5) {
                                        // Close enough: tunnel or repel?
                                        var tunnelProb = temperature / 20; // simplified
                                        if (Math.random() < tunnelProb) {
                                            simState = 'tunneling';
                                            simTime = 0;
                                        } else {
                                            simState = 'repelled';
                                            speed1 = -Math.abs(speed1) * 0.8;
                                            speed2 = Math.abs(speed2) * 0.8;
                                        }
                                    }

                                    // If they start moving apart (repulsion overcame approach), mark as repelled
                                    if (speed1 < -0.1 && speed2 > 0.1 && separation > protonR * 4) {
                                        simState = 'repelled';
                                    }
                                }

                                if (simState === 'repelled') {
                                    proton1X += speed1;
                                    proton2X += speed2;
                                    // Slow down
                                    speed1 *= 0.995;
                                    speed2 *= 0.995;
                                }

                                if (simState === 'tunneling') {
                                    // Animate merging
                                    proton1X += (midX - proton1X) * 0.08;
                                    proton2X += (midX - proton2X) * 0.08;
                                    if (Math.abs(proton1X - midX) < 2) {
                                        simState = 'fused';
                                        flashAlpha = 1.5;
                                        fusedTime = 0;
                                    }
                                }

                                if (simState === 'fused') {
                                    flashAlpha *= 0.97;
                                    fusedTime += 1 / 60;
                                }

                                // Draw potential energy curve
                                var peH = peGraphB - peGraphT;
                                var peW = peGraphR - peGraphL;
                                ctx.fillStyle = 'rgba(12,12,32,0.6)';
                                ctx.fillRect(peGraphL - 5, peGraphT - 15, peW + 10, peH + 25);

                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(peGraphL, peGraphB); ctx.lineTo(peGraphR, peGraphB); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(peGraphL + peW / 2, peGraphT); ctx.lineTo(peGraphL + peW / 2, peGraphB); ctx.stroke();

                                viz.screenText('Potential Energy', peGraphL + peW / 2, peGraphT - 5, viz.colors.text, 10);
                                viz.screenText('r', peGraphR + 8, peGraphB, viz.colors.text, 10, 'left');

                                // Coulomb barrier curve + nuclear well
                                ctx.strokeStyle = viz.colors.cyan; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var zeroPE = peGraphB - peH * 0.3; // zero line
                                for (var px = 0; px <= peW; px++) {
                                    var r = (px - peW / 2) / (peW / 2); // -1 to 1
                                    var absR = Math.abs(r);
                                    var pe;
                                    if (absR < 0.08) {
                                        pe = -0.6; // nuclear well
                                    } else if (absR < 0.15) {
                                        pe = VizEngine.lerp(-0.6, 0.8, (absR - 0.08) / 0.07);
                                    } else {
                                        pe = 0.3 / absR; // Coulomb 1/r
                                    }
                                    var sy = zeroPE - pe * peH * 0.55;
                                    sy = VizEngine.clamp(sy, peGraphT, peGraphB);
                                    if (px === 0) ctx.moveTo(peGraphL + px, sy);
                                    else ctx.lineTo(peGraphL + px, sy);
                                }
                                ctx.stroke();

                                // Labels on PE curve
                                viz.screenText('Coulomb barrier', peGraphL + peW * 0.75, peGraphT + 15, viz.colors.cyan, 8, 'center');
                                viz.screenText('Nuclear well', peGraphL + peW * 0.5, peGraphB - 5, viz.colors.green, 8, 'center');

                                // Kinetic energy line
                                var keLevel = zeroPE - (temperature / 20) * peH * 0.35;
                                ctx.setLineDash([4, 4]);
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(peGraphL, keLevel); ctx.lineTo(peGraphR, keLevel); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('KE (T=' + temperature.toFixed(0) + 'M K)', peGraphR + 5, keLevel, viz.colors.orange, 8, 'left');

                                // Flash
                                if (flashAlpha > 0.01) {
                                    ctx.save();
                                    ctx.globalAlpha = Math.min(flashAlpha, 1) * 0.6;
                                    var grad = ctx.createRadialGradient(midX, centerY, 0, midX, centerY, 150);
                                    grad.addColorStop(0, '#ffffff');
                                    grad.addColorStop(0.3, viz.colors.gold);
                                    grad.addColorStop(0.6, viz.colors.orange + '44');
                                    grad.addColorStop(1, 'transparent');
                                    ctx.fillStyle = grad;
                                    ctx.beginPath(); ctx.arc(midX, centerY, 150, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }

                                // Draw protons
                                if (simState !== 'fused') {
                                    // Proton 1
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.red; ctx.shadowBlur = 12;
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath(); ctx.arc(proton1X, centerY, protonR, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText('p', proton1X, centerY);

                                    // Proton 2
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.red; ctx.shadowBlur = 12;
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath(); ctx.arc(proton2X, centerY, protonR, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.fillText('p', proton2X, centerY);

                                    // Arrows showing approach/repulsion
                                    if (simState === 'approaching' && speed1 > 0.1) {
                                        ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                        ctx.beginPath();
                                        ctx.moveTo(proton1X + protonR + 5, centerY);
                                        ctx.lineTo(proton1X + protonR + 20, centerY);
                                        ctx.stroke();
                                        ctx.beginPath();
                                        ctx.moveTo(proton2X - protonR - 5, centerY);
                                        ctx.lineTo(proton2X - protonR - 20, centerY);
                                        ctx.stroke();
                                    }
                                } else {
                                    // Fused: show helium-like product with glow
                                    var pulseR = protonR * 1.3 + Math.sin(t * 3) * 2;
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.gold; ctx.shadowBlur = 20;
                                    ctx.fillStyle = viz.colors.gold;
                                    ctx.beginPath(); ctx.arc(midX, centerY, pulseR, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText('He', midX, centerY);

                                    // Energy release text
                                    if (fusedTime > 0.3) {
                                        viz.screenText('FUSION! Energy released: 17.6 MeV', midX, centerY - 40, viz.colors.gold, 13);
                                    }

                                    // Radiating energy lines
                                    if (fusedTime < 3) {
                                        ctx.save();
                                        ctx.globalAlpha = Math.max(0, 1 - fusedTime / 3);
                                        for (var i = 0; i < 8; i++) {
                                            var ra = i * Math.PI / 4 + fusedTime * 0.5;
                                            var rLen = 30 + fusedTime * 40;
                                            ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1.5;
                                            ctx.beginPath();
                                            ctx.moveTo(midX + Math.cos(ra) * pulseR * 1.2, centerY + Math.sin(ra) * pulseR * 1.2);
                                            ctx.lineTo(midX + Math.cos(ra) * rLen, centerY + Math.sin(ra) * rLen);
                                            ctx.stroke();
                                        }
                                        ctx.restore();
                                    }
                                }

                                // Status text
                                var statusText = '';
                                var statusColor = viz.colors.text;
                                if (simState === 'approaching' && speed1 > 0.1) { statusText = 'Approaching... Coulomb repulsion intensifies'; statusColor = viz.colors.orange; }
                                else if (simState === 'repelled') { statusText = 'Repelled! Not enough energy to tunnel.'; statusColor = viz.colors.red; }
                                else if (simState === 'tunneling') { statusText = 'Tunneling through the barrier...'; statusColor = viz.colors.teal; }
                                else if (simState === 'fused') { statusText = 'Fusion achieved!'; statusColor = viz.colors.gold; }
                                else { statusText = 'Press "Launch!" to fire protons at each other'; statusColor = viz.colors.text; }

                                viz.screenText(statusText, midX, 18, statusColor, 12);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why is the Coulomb barrier higher for heavier nuclei? Why does this make hydrogen fusion the easiest?',
                        hint: 'The barrier height scales with \\(Z_1 Z_2\\). What is \\(Z\\) for hydrogen?',
                        solution: 'The Coulomb barrier is \\(U_C \\propto Z_1 Z_2 / r\\). Hydrogen has \\(Z = 1\\), so the barrier for p-p fusion is \\(\\propto 1 \\times 1 = 1\\). For carbon-carbon fusion, it is \\(\\propto 6 \\times 6 = 36\\), requiring temperatures about 36 times higher. This is why hydrogen fusion ignites first in stars, at the lowest temperature.'
                    }
                ]
            },

            // ============================================================
            // Section 2: The pp Chain in the Sun
            // ============================================================
            {
                id: 'pp-chain',
                title: 'The pp Chain in the Sun',
                content: `
<h2>How the Sun Shines</h2>

<p>The Sun fuses hydrogen into helium through a sequence of reactions called the <strong>proton-proton chain</strong> (pp chain). This is the dominant energy source for stars with masses up to about 1.3 times the Sun's mass.</p>

<div class="env-block definition">
<div class="env-title">Definition: The pp Chain (pp I branch)</div>
<div class="env-body">
<p><strong>Step 1</strong>: Two protons fuse, with one undergoing inverse beta decay to become a neutron:</p>
\\[p + p \\rightarrow {}^2_1\\text{H} + e^+ + \\nu_e + 0.42\\,\\text{MeV}\\]
<p>This is the rate-limiting step (average wait: \\(10^9\\) years for a given proton).</p>

<p><strong>Step 2</strong>: The deuterium fuses with another proton:</p>
\\[{}^2_1\\text{H} + p \\rightarrow {}^3_2\\text{He} + \\gamma + 5.49\\,\\text{MeV}\\]

<p><strong>Step 3</strong>: Two helium-3 nuclei fuse:</p>
\\[{}^3_2\\text{He} + {}^3_2\\text{He} \\rightarrow {}^4_2\\text{He} + 2p + 12.86\\,\\text{MeV}\\]

<p>Net reaction (combining two copies of steps 1-2 with step 3):</p>
\\[4p \\rightarrow {}^4_2\\text{He} + 2e^+ + 2\\nu_e + 26.7\\,\\text{MeV}\\]
</div>
</div>

<div class="viz-placeholder" data-viz="viz-pp-chain"></div>

<div class="env-block remark">
<div class="env-title">Why step 1 is so slow</div>
<div class="env-body">
<p>Step 1 requires a proton to simultaneously tunnel through the Coulomb barrier <em>and</em> undergo a weak-force interaction (converting a proton to a neutron via \\(p \\rightarrow n + e^+ + \\nu_e\\)). The probability of both happening at once is extraordinarily small. This is why the Sun burns its fuel so slowly and will shine for \\(\\sim 10\\) billion years, even though each reaction releases only a modest amount of energy.</p>
</div>
</div>

<h3>The Sun's Power Output</h3>

<p>The Sun's luminosity is \\(L_{\\odot} = 3.846 \\times 10^{26}\\,\\text{W}\\). Since each pp chain reaction converts about 0.7% of the proton rest mass into energy:</p>
\\[\\dot{m} = \\frac{L_{\\odot}}{c^2} \\approx 4.3 \\times 10^9\\,\\text{kg/s}\\]
<p>The Sun converts about 4.3 million tonnes of mass into energy every second. Even at this rate, it has enough hydrogen to last another 5 billion years.</p>
`,
                visualizations: [
                    {
                        id: 'viz-pp-chain',
                        title: 'The Proton-Proton Chain: Step by Step',
                        description: 'Watch the pp chain unfold step by step. Protons (red) fuse to make deuterium, then helium-3, then helium-4. Click through the steps or let the animation run. Neutrinos (purple) and positrons (pink) are emitted along the way.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var currentStep = 0; // 0-3
                            var stepTime = 0;
                            var autoPlay = false;
                            var stepDuration = 180; // frames per step

                            VizEngine.createButton(controls, 'Next Step', function () {
                                currentStep = (currentStep + 1) % 4;
                                stepTime = 0;
                            });

                            VizEngine.createButton(controls, 'Auto Play', function () {
                                autoPlay = !autoPlay;
                                stepTime = 0;
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                currentStep = 0;
                                stepTime = 0;
                                autoPlay = false;
                            });

                            var steps = [
                                {
                                    title: 'Step 1: p + p \u2192 \u00B2H + e\u207A + \u03BD',
                                    energy: '0.42 MeV',
                                    desc: 'Two protons fuse. One becomes a neutron (weak force).'
                                },
                                {
                                    title: 'Step 2: \u00B2H + p \u2192 \u00B3He + \u03B3',
                                    energy: '5.49 MeV',
                                    desc: 'Deuterium captures a proton to form helium-3.'
                                },
                                {
                                    title: 'Step 1+2 again (need two \u00B3He)',
                                    energy: '5.91 MeV',
                                    desc: 'Steps 1 and 2 repeat to make a second \u00B3He.'
                                },
                                {
                                    title: 'Step 3: \u00B3He + \u00B3He \u2192 \u2074He + 2p',
                                    energy: '12.86 MeV',
                                    desc: 'Two helium-3 fuse into helium-4, releasing 2 protons.'
                                }
                            ];

                            // Particle drawing helper
                            function drawParticle(x, y, r, color, label, glowColor) {
                                ctx.save();
                                ctx.shadowColor = glowColor || color;
                                ctx.shadowBlur = 10;
                                ctx.fillStyle = color;
                                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();
                                if (label) {
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold ' + Math.max(8, r * 0.8) + 'px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(label, x, y);
                                }
                            }

                            function draw(now) {
                                viz.clear();
                                var t = now / 1000;
                                stepTime++;

                                if (autoPlay && stepTime > stepDuration) {
                                    currentStep = (currentStep + 1) % 4;
                                    stepTime = 0;
                                }

                                var progress = VizEngine.clamp(stepTime / (stepDuration * 0.6), 0, 1);
                                var cx = w / 2, cy = h * 0.42;

                                // Step info
                                var step = steps[currentStep];
                                viz.screenText(step.title, cx, 18, viz.colors.gold, 14);
                                viz.screenText(step.desc, cx, 38, viz.colors.text, 11);
                                viz.screenText('Energy: ' + step.energy, cx, 55, viz.colors.orange, 11);

                                // Step indicator
                                for (var s = 0; s < 4; s++) {
                                    var dotX = cx - 45 + s * 30;
                                    var dotY = h - 18;
                                    ctx.fillStyle = s === currentStep ? viz.colors.gold : viz.colors.axis;
                                    ctx.beginPath(); ctx.arc(dotX, dotY, 5, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText((s + 1).toString(), dotX, dotY - 12, viz.colors.text, 8);
                                }

                                var pR = 16; // proton radius

                                if (currentStep === 0) {
                                    // p + p -> D + e+ + v
                                    var startSep = 120;
                                    var p1x = cx - startSep * (1 - progress);
                                    var p2x = cx + startSep * (1 - progress);

                                    if (progress < 0.7) {
                                        drawParticle(p1x, cy, pR, viz.colors.red, 'p');
                                        drawParticle(p2x, cy, pR, viz.colors.red, 'p');
                                        // Arrow
                                        if (progress < 0.5) {
                                            viz.screenText('\u2192', (p1x + cx) / 2, cy, viz.colors.green, 16);
                                            viz.screenText('\u2190', (p2x + cx) / 2, cy, viz.colors.green, 16);
                                        }
                                    } else {
                                        // Show deuterium
                                        var dp = (progress - 0.7) / 0.3;
                                        drawParticle(cx - 8, cy, pR, viz.colors.red, 'p');
                                        drawParticle(cx + 8, cy, pR, viz.colors.blue, 'n');
                                        viz.screenText('\u00B2H', cx, cy - pR - 12, viz.colors.teal, 13);

                                        // Emitted positron and neutrino
                                        var eX = cx + 50 + dp * 80;
                                        var eY = cy - 30 - dp * 30;
                                        var vX = cx + 40 + dp * 90;
                                        var vY = cy + 30 + dp * 40;
                                        drawParticle(eX, eY, 6, viz.colors.pink, 'e\u207A', viz.colors.pink);
                                        drawParticle(vX, vY, 5, viz.colors.purple, '\u03BD', viz.colors.purple);
                                    }
                                }

                                if (currentStep === 1) {
                                    // D + p -> He-3 + gamma
                                    if (progress < 0.6) {
                                        var dx = cx - 60 * (1 - progress);
                                        var px = cx + 80 * (1 - progress);
                                        // Deuterium
                                        drawParticle(dx - 7, cy, pR * 0.9, viz.colors.red, 'p');
                                        drawParticle(dx + 7, cy, pR * 0.9, viz.colors.blue, 'n');
                                        // Proton
                                        drawParticle(px, cy, pR, viz.colors.red, 'p');
                                    } else {
                                        var dp = (progress - 0.6) / 0.4;
                                        // He-3 (2p + 1n)
                                        drawParticle(cx - 10, cy - 6, pR * 0.85, viz.colors.red, 'p');
                                        drawParticle(cx + 10, cy - 6, pR * 0.85, viz.colors.red, 'p');
                                        drawParticle(cx, cy + 8, pR * 0.85, viz.colors.blue, 'n');
                                        viz.screenText('\u00B3He', cx, cy - pR - 15, viz.colors.green, 13);

                                        // Gamma ray
                                        var gx = cx + 60 + dp * 100;
                                        var gy = cy - 20 - dp * 20;
                                        // Wavy line for gamma
                                        ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 2;
                                        ctx.beginPath();
                                        for (var wi = 0; wi < 20; wi++) {
                                            var wx = gx - 20 + wi * 2;
                                            var wy = gy + Math.sin(wi * 1.2 + t * 8) * 4;
                                            if (wi === 0) ctx.moveTo(wx, wy); else ctx.lineTo(wx, wy);
                                        }
                                        ctx.stroke();
                                        viz.screenText('\u03B3', gx + 15, gy - 10, viz.colors.yellow, 11);
                                    }
                                }

                                if (currentStep === 2) {
                                    // Same as steps 1+2 but shown as result
                                    var alpha = 0.3 + 0.7 * Math.min(progress * 2, 1);
                                    ctx.globalAlpha = alpha;

                                    // First He-3 (left)
                                    drawParticle(cx - 70, cy, pR * 0.85, viz.colors.red, 'p');
                                    drawParticle(cx - 50, cy, pR * 0.85, viz.colors.red, 'p');
                                    drawParticle(cx - 60, cy + 14, pR * 0.85, viz.colors.blue, 'n');
                                    viz.screenText('\u00B3He', cx - 60, cy - pR - 12, viz.colors.green, 12);

                                    // Second He-3 (right)
                                    drawParticle(cx + 50, cy, pR * 0.85, viz.colors.red, 'p');
                                    drawParticle(cx + 70, cy, pR * 0.85, viz.colors.red, 'p');
                                    drawParticle(cx + 60, cy + 14, pR * 0.85, viz.colors.blue, 'n');
                                    viz.screenText('\u00B3He', cx + 60, cy - pR - 12, viz.colors.green, 12);

                                    ctx.globalAlpha = 1;
                                    viz.screenText('(Repeat steps 1 & 2 to get two \u00B3He)', cx, cy + 55, viz.colors.text, 10);
                                }

                                if (currentStep === 3) {
                                    // He-3 + He-3 -> He-4 + 2p
                                    if (progress < 0.5) {
                                        var sep = 80 * (1 - progress * 2);
                                        // Two He-3 approaching
                                        drawParticle(cx - sep - 10, cy, pR * 0.8, viz.colors.red, 'p');
                                        drawParticle(cx - sep + 10, cy, pR * 0.8, viz.colors.red, 'p');
                                        drawParticle(cx - sep, cy + 12, pR * 0.8, viz.colors.blue, 'n');

                                        drawParticle(cx + sep - 10, cy, pR * 0.8, viz.colors.red, 'p');
                                        drawParticle(cx + sep + 10, cy, pR * 0.8, viz.colors.red, 'p');
                                        drawParticle(cx + sep, cy + 12, pR * 0.8, viz.colors.blue, 'n');
                                    } else {
                                        var dp = (progress - 0.5) / 0.5;
                                        // He-4
                                        drawParticle(cx - 8, cy - 8, pR * 0.85, viz.colors.red, 'p');
                                        drawParticle(cx + 8, cy - 8, pR * 0.85, viz.colors.red, 'p');
                                        drawParticle(cx - 8, cy + 8, pR * 0.85, viz.colors.blue, 'n');
                                        drawParticle(cx + 8, cy + 8, pR * 0.85, viz.colors.blue, 'n');
                                        viz.screenText('\u2074He', cx, cy - pR - 18, viz.colors.gold, 14);

                                        // Two ejected protons
                                        var ep1x = cx - 50 - dp * 80;
                                        var ep1y = cy - 20 - dp * 40;
                                        var ep2x = cx + 50 + dp * 80;
                                        var ep2y = cy - 15 - dp * 45;
                                        drawParticle(ep1x, ep1y, pR * 0.7, viz.colors.red, 'p');
                                        drawParticle(ep2x, ep2y, pR * 0.7, viz.colors.red, 'p');
                                        viz.screenText('(returned protons)', cx, cy + 50, viz.colors.text, 10);

                                        // Energy flash
                                        if (dp < 0.5) {
                                            ctx.save();
                                            ctx.globalAlpha = (1 - dp * 2) * 0.4;
                                            var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
                                            grad.addColorStop(0, '#ffffff');
                                            grad.addColorStop(1, 'transparent');
                                            ctx.fillStyle = grad;
                                            ctx.beginPath(); ctx.arc(cx, cy, 80, 0, Math.PI * 2); ctx.fill();
                                            ctx.restore();
                                        }
                                    }
                                }

                                // Net equation at bottom
                                viz.screenText('Net: 4p \u2192 \u2074He + 2e\u207A + 2\u03BD + 26.7 MeV', cx, h - 40, viz.colors.white, 12);
                                viz.screenText(autoPlay ? '(auto-playing)' : '', cx + 160, h - 18, viz.colors.teal, 9);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'The Sun converts 600 million tonnes of hydrogen into 596 million tonnes of helium every second. Where does the missing 4 million tonnes go?',
                        hint: 'Think about \\(E = mc^2\\).',
                        solution: 'The missing 4 million tonnes (\\(4 \\times 10^9\\,\\text{kg}\\)) is converted into energy: \\(E = mc^2 = 4 \\times 10^9 \\times (3 \\times 10^8)^2 = 3.6 \\times 10^{26}\\,\\text{J/s}\\). This is the Sun\'s luminosity, radiated as light and neutrinos.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Fusion Power on Earth
            // ============================================================
            {
                id: 'fusion-power',
                title: 'Fusion Power on Earth',
                content: `
<h2>Bottling a Star</h2>

<p>If we could harness fusion on Earth, the fuel supply would be virtually unlimited (deuterium from seawater), the reaction produces no greenhouse gases, and the radioactive waste is minimal compared to fission. But achieving fusion on Earth is extraordinarily difficult.</p>

<div class="env-block definition">
<div class="env-title">Definition: Lawson Criterion</div>
<div class="env-body">
<p>For a fusion reactor to produce net energy, the plasma must satisfy the <strong>Lawson criterion</strong>:</p>
\\[n \\tau_E T > \\text{threshold}\\]
<p>where \\(n\\) is the plasma density, \\(\\tau_E\\) is the energy confinement time, and \\(T\\) is the temperature. For D-T fusion, the plasma must reach about \\(150\\) million K (ten times the Sun's core temperature) and be confined long enough at sufficient density.</p>
</div>
</div>

<h3>Why So Hot?</h3>

<p>The Sun achieves fusion at "only" 15 million K because its enormous gravity provides immense pressure and density, and it can afford to wait billions of years for the slow pp reaction. On Earth, we use the faster D-T reaction, but we lack gravitational confinement, so we need higher temperatures to compensate.</p>

<h3>Confinement Approaches</h3>

<div class="env-block remark">
<div class="env-title">Two main approaches</div>
<div class="env-body">
<p><strong>Magnetic confinement</strong>: Use powerful magnetic fields to contain the plasma in a donut-shaped chamber called a <strong>tokamak</strong>. The magnetic field prevents the charged plasma particles from touching the walls. ITER is the world's largest tokamak, under construction in France.</p>
<p><strong>Inertial confinement</strong>: Use powerful lasers to compress a tiny pellet of D-T fuel so rapidly that fusion occurs before the fuel can fly apart. The National Ignition Facility (NIF) in the USA achieved ignition (more energy out than laser energy in on the capsule) in December 2022.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'The D-T reaction requires about 150 million K. The Sun\'s core is about 15 million K. Why does Earth-based fusion need higher temperatures than the Sun?',
                        hint: 'Consider the differences in density, confinement time, and reaction mechanism.',
                        solution: 'The Sun has enormous density (\\(\\sim 150\\,\\text{g/cm}^3\\) at the core) and gravitational confinement that lasts billions of years. On Earth, plasma density is about a million times lower, and confinement times are measured in seconds. To compensate for the much lower \\(n\\tau_E\\), we need much higher \\(T\\) to maintain a sufficient reaction rate. Additionally, the Sun uses the slow pp reaction, while we use the faster D-T reaction, which has a lower barrier but still requires extreme temperatures.'
                    }
                ]
            },

            // ============================================================
            // Section 4: ITER and the Future
            // ============================================================
            {
                id: 'iter-future',
                title: 'ITER and the Future',
                content: `
<h2>The Road to Fusion Energy</h2>

<p>ITER (International Thermonuclear Experimental Reactor), under construction in Cadarache, France, is a collaboration of 35 nations. It aims to demonstrate that fusion can produce net energy at a scale relevant to power generation.</p>

<div class="env-block definition">
<div class="env-title">Definition: Q Factor</div>
<div class="env-body">
<p>The <strong>Q factor</strong> (energy gain) of a fusion device is the ratio of fusion power output to heating power input:</p>
\\[Q = \\frac{P_{\\text{fusion}}}{P_{\\text{heating}}}\\]
<ul>
<li>\\(Q < 1\\): More energy in than out (all experiments before 2022)</li>
<li>\\(Q = 1\\): Breakeven</li>
<li>\\(Q > 1\\): Net energy gain</li>
<li>\\(Q = \\infty\\): Ignition (self-sustaining, no external heating needed)</li>
</ul>
<p>ITER's target: \\(Q = 10\\) (produce 500 MW of fusion power from 50 MW of heating).</p>
</div>
</div>

<h3>Timeline and Challenges</h3>

<ul>
<li><strong>1950s-present</strong>: Steady progress in plasma confinement. Fusion has been "30 years away" for decades, but recent advances in superconducting magnets, plasma control, and materials are accelerating progress.</li>
<li><strong>2022</strong>: NIF achieves scientific ignition (\\(Q > 1\\) on the capsule, though \\(Q \\ll 1\\) for the whole facility).</li>
<li><strong>2025-2035</strong>: ITER construction and first plasma. ITER is not a power plant; it is an experiment.</li>
<li><strong>2040s+</strong>: DEMO (Demonstration Power Plant) aims to produce electricity from fusion for the first time.</li>
</ul>

<div class="env-block intuition">
<div class="env-title">Why fusion is worth the wait</div>
<div class="env-body">
<p>Deuterium is abundant in seawater (1 in every 6,500 hydrogen atoms). The ocean contains enough deuterium to power human civilization for billions of years. Tritium can be bred from lithium inside the reactor. Fusion produces no long-lived radioactive waste and no greenhouse gases. The fuel cannot melt down: if confinement is lost, the plasma cools instantly and the reaction stops. It is the ultimate energy source, if we can make it work.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Fusion is not yet solved</div>
<div class="env-body">
<p>Immense engineering challenges remain: materials that can withstand the neutron bombardment, reliable tritium breeding, plasma instabilities, and the sheer cost and complexity of the technology. Optimism is warranted; complacency is not.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If ITER achieves \\(Q = 10\\) with 50 MW of heating, what is the fusion power output? If 80% of this could be converted to electricity, what is the electrical output?',
                        hint: '\\(P_{\\text{fusion}} = Q \\times P_{\\text{heating}}\\).',
                        solution: '\\(P_{\\text{fusion}} = 10 \\times 50 = 500\\,\\text{MW}\\). Electrical output: \\(0.80 \\times 500 = 400\\,\\text{MW}_e\\). However, ITER is an experimental reactor, not designed for electricity generation. A future DEMO reactor would actually convert fusion power to grid electricity.'
                    }
                ]
            }
        ]
    });
})();
