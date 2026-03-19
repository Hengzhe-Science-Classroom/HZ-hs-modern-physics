// === Chapter 4: Blackbody Radiation & Planck ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch04',
        number: 4,
        title: 'Blackbody Radiation & Planck',
        subtitle: 'How the failure of classical physics forced the birth of the quantum',
        file: 'ch04-blackbody',

        sections: [
            // ============================================================
            // Section 0: Glowing Hot Objects
            // ============================================================
            {
                id: 'glowing-objects',
                title: 'Glowing Hot Objects',
                content: `
<h2>Light from Heat</h2>

<p>Heat a piece of iron in a forge and watch it change color. At first it glows a dull, barely visible red. As it gets hotter, the color shifts to cherry red, then orange, then yellow-white. At the highest temperatures, it radiates an intense blue-white light. This progression is universal: it does not depend on what material you heat. Iron, tungsten, ceramic, lava; they all follow the same color sequence.</p>

<div class="env-block definition">
<div class="env-title">Definition: Thermal Radiation</div>
<div class="env-body">
<p><strong>Thermal radiation</strong> is electromagnetic radiation emitted by all objects with temperature above absolute zero. The spectrum (distribution of wavelengths) depends only on the object's temperature, not on what it is made of.</p>
</div>
</div>

<p>This universality was deeply puzzling to 19th-century physicists. Why should such different materials produce the same light when heated to the same temperature? The answer required a theoretical idealization: the <strong>blackbody</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Blackbody</div>
<div class="env-body">
<p>A <strong>blackbody</strong> is an idealized object that absorbs all incoming radiation (reflects nothing) and, when in thermal equilibrium, emits radiation with a spectrum determined solely by its temperature. A small hole in a large cavity is an excellent approximation of a blackbody.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why a hole in a cavity?</div>
<div class="env-body">
<p>Imagine a hollow box with a tiny hole. Any light entering the hole bounces around inside, getting absorbed bit by bit with each reflection. Almost none escapes back out. So the hole acts as a perfect absorber. By Kirchhoff's law, a perfect absorber is also a perfect emitter, so the radiation coming out of the hole has exactly the blackbody spectrum at the cavity's temperature.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-blackbody-showpiece"></div>
`,
                visualizations: [
                    {
                        id: 'viz-blackbody-showpiece',
                        title: 'Blackbody Spectrum: Temperature and Color',
                        description: 'Adjust the <strong>temperature</strong> to see the blackbody spectrum shift. The glowing circle shows the actual color of the object. The dashed curve shows the classical Rayleigh-Jeans prediction, which diverges catastrophically at short wavelengths. The vertical dashed line marks the Wien peak.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var T = 5000;
                            VizEngine.createSlider(controls, 'T (K)', 500, 12000, T, 100, function (v) { T = v; });

                            // Layout
                            var plotL = 70, plotR = w - 30, plotT = 35, plotB = h - 55;
                            var plotW = plotR - plotL, plotH = plotB - plotT;

                            // Planck function: spectral radiance B(lambda, T)
                            // lambda in nm, returns value in arbitrary units scaled for display
                            var hc = 6.626e-34 * 3e8; // h*c in J*m
                            var kB = 1.381e-23;

                            function planck(lam_nm, temp) {
                                var lam = lam_nm * 1e-9;
                                var x = hc / (lam * kB * temp);
                                if (x > 500) return 0;
                                return (2 * hc * 3e8) / (Math.pow(lam, 5) * (Math.exp(x) - 1));
                            }

                            // Rayleigh-Jeans: classical approximation
                            function rayleighJeans(lam_nm, temp) {
                                var lam = lam_nm * 1e-9;
                                return (2 * 3e8 * kB * temp) / Math.pow(lam, 4);
                            }

                            // Wien's displacement law: peak wavelength in nm
                            function wienPeak(temp) {
                                return 2.898e6 / temp; // nm
                            }

                            // Convert wavelength (nm) to approximate RGB color
                            function wavelengthToRGB(lam) {
                                var r = 0, g = 0, b = 0;
                                if (lam >= 380 && lam < 440) {
                                    r = -(lam - 440) / (440 - 380);
                                    b = 1;
                                } else if (lam >= 440 && lam < 490) {
                                    g = (lam - 440) / (490 - 440);
                                    b = 1;
                                } else if (lam >= 490 && lam < 510) {
                                    g = 1;
                                    b = -(lam - 510) / (510 - 490);
                                } else if (lam >= 510 && lam < 580) {
                                    r = (lam - 510) / (580 - 510);
                                    g = 1;
                                } else if (lam >= 580 && lam < 645) {
                                    r = 1;
                                    g = -(lam - 645) / (645 - 580);
                                } else if (lam >= 645 && lam <= 780) {
                                    r = 1;
                                }
                                // Intensity falloff at edges
                                var factor = 1;
                                if (lam >= 380 && lam < 420) factor = 0.3 + 0.7 * (lam - 380) / (420 - 380);
                                else if (lam >= 645 && lam <= 780) factor = 0.3 + 0.7 * (780 - lam) / (780 - 645);
                                else if (lam < 380 || lam > 780) factor = 0;
                                return [r * factor, g * factor, b * factor];
                            }

                            // Blackbody color: integrate Planck over visible spectrum weighted by color matching
                            function blackbodyColor(temp) {
                                var rr = 0, gg = 0, bb = 0;
                                for (var l = 380; l <= 780; l += 5) {
                                    var intensity = planck(l, temp);
                                    var rgb = wavelengthToRGB(l);
                                    rr += rgb[0] * intensity;
                                    gg += rgb[1] * intensity;
                                    bb += rgb[2] * intensity;
                                }
                                var mx = Math.max(rr, gg, bb, 1e-30);
                                rr = Math.pow(rr / mx, 0.45);
                                gg = Math.pow(gg / mx, 0.45);
                                bb = Math.pow(bb / mx, 0.45);
                                return 'rgb(' + Math.round(rr * 255) + ',' + Math.round(gg * 255) + ',' + Math.round(bb * 255) + ')';
                            }

                            // Display range
                            var lamMin = 50, lamMax = 3000; // nm

                            function draw() {
                                viz.clear();

                                // Find Planck peak for y-scale
                                var peakLam = wienPeak(T);
                                var peakVal = planck(peakLam, T);
                                if (peakVal < 1e-30) peakVal = 1e-30;
                                var yMax = peakVal * 1.35;

                                // Rayleigh-Jeans max for display (clamp it)
                                var rjMax = yMax * 2;

                                // Plot background
                                ctx.fillStyle = '#060612';
                                ctx.fillRect(plotL, plotT, plotW, plotH);

                                // Visible spectrum strip at bottom of plot
                                for (var px = 0; px < plotW; px++) {
                                    var lam = lamMin + (px / plotW) * (lamMax - lamMin);
                                    if (lam >= 380 && lam <= 780) {
                                        var rgb = wavelengthToRGB(lam);
                                        ctx.fillStyle = 'rgba(' + Math.round(rgb[0] * 255) + ',' + Math.round(rgb[1] * 255) + ',' + Math.round(rgb[2] * 255) + ',0.25)';
                                        ctx.fillRect(plotL + px, plotB - plotH, 1, plotH);
                                    }
                                }

                                // Grid lines
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                for (var gl = 500; gl <= 2500; gl += 500) {
                                    var gx = plotL + ((gl - lamMin) / (lamMax - lamMin)) * plotW;
                                    ctx.beginPath(); ctx.moveTo(gx, plotT); ctx.lineTo(gx, plotB); ctx.stroke();
                                    viz.screenText(gl.toString(), gx, plotB + 12, viz.colors.text, 9);
                                }

                                // Planck curve (filled with glow)
                                ctx.beginPath();
                                ctx.moveTo(plotL, plotB);
                                for (var i = 0; i <= plotW; i++) {
                                    var lam2 = lamMin + (i / plotW) * (lamMax - lamMin);
                                    var val = planck(lam2, T);
                                    var py = plotB - (val / yMax) * plotH;
                                    py = Math.max(py, plotT);
                                    ctx.lineTo(plotL + i, py);
                                }
                                ctx.lineTo(plotR, plotB);
                                ctx.closePath();

                                // Gradient fill under Planck curve
                                var bbColor = blackbodyColor(T);
                                var grad = ctx.createLinearGradient(plotL, plotT, plotL, plotB);
                                grad.addColorStop(0, bbColor);
                                grad.addColorStop(1, 'rgba(0,0,0,0)');
                                ctx.fillStyle = grad;
                                ctx.globalAlpha = 0.35;
                                ctx.fill();
                                ctx.globalAlpha = 1;

                                // Planck curve stroke
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var started = false;
                                for (var j = 0; j <= plotW; j++) {
                                    var lam3 = lamMin + (j / plotW) * (lamMax - lamMin);
                                    var val2 = planck(lam3, T);
                                    var py2 = plotB - (val2 / yMax) * plotH;
                                    py2 = Math.max(py2, plotT);
                                    if (!started) { ctx.moveTo(plotL + j, py2); started = true; }
                                    else ctx.lineTo(plotL + j, py2);
                                }
                                ctx.stroke();

                                // Rayleigh-Jeans curve (dashed, red)
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                var rjStarted = false;
                                for (var k = 0; k <= plotW; k++) {
                                    var lam4 = lamMin + (k / plotW) * (lamMax - lamMin);
                                    var rjVal = rayleighJeans(lam4, T);
                                    var rjY = plotB - (rjVal / yMax) * plotH;
                                    rjY = Math.max(rjY, plotT - 5);
                                    if (rjY <= plotT - 5 && rjStarted) break;
                                    if (!rjStarted) { ctx.moveTo(plotL + k, rjY); rjStarted = true; }
                                    else ctx.lineTo(plotL + k, rjY);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Wien peak marker
                                if (peakLam >= lamMin && peakLam <= lamMax) {
                                    var peakX = plotL + ((peakLam - lamMin) / (lamMax - lamMin)) * plotW;
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1.5;
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath(); ctx.moveTo(peakX, plotT); ctx.lineTo(peakX, plotB); ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('\u03BBmax = ' + peakLam.toFixed(0) + ' nm', peakX, plotT - 8, viz.colors.yellow, 10);
                                }

                                // Axes border
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(plotL, plotT, plotW, plotH);

                                // Axis labels
                                viz.screenText('Wavelength \u03BB (nm)', plotL + plotW / 2, plotB + 30, viz.colors.text, 12);
                                ctx.save();
                                ctx.translate(plotL - 35, plotT + plotH / 2);
                                ctx.rotate(-Math.PI / 2);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Spectral Radiance B(\u03BB)', 0, 0);
                                ctx.restore();

                                // Glowing blackbody circle (top-right)
                                var circX = plotR - 55, circY = plotT + 55, circR = 35;
                                var glowGrad = ctx.createRadialGradient(circX, circY, circR * 0.2, circX, circY, circR * 2.2);
                                glowGrad.addColorStop(0, bbColor);
                                glowGrad.addColorStop(0.4, bbColor);
                                glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
                                ctx.fillStyle = glowGrad;
                                ctx.beginPath();
                                ctx.arc(circX, circY, circR * 2.2, 0, Math.PI * 2);
                                ctx.fill();

                                ctx.fillStyle = bbColor;
                                ctx.beginPath();
                                ctx.arc(circX, circY, circR, 0, Math.PI * 2);
                                ctx.fill();

                                // Highlight on sphere
                                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                                ctx.beginPath();
                                ctx.arc(circX - circR * 0.25, circY - circR * 0.25, circR * 0.35, 0, Math.PI * 2);
                                ctx.fill();

                                viz.screenText(T.toFixed(0) + ' K', circX, circY + circR + 16, viz.colors.white, 11);

                                // Legend
                                var legX = plotL + 10, legY = plotT + 15;
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillRect(legX, legY, 12, 3);
                                viz.screenText('Planck', legX + 18, legY + 2, viz.colors.white, 10, 'left');

                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([5, 3]);
                                ctx.beginPath(); ctx.moveTo(legX, legY + 16); ctx.lineTo(legX + 12, legY + 16); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('Rayleigh-Jeans', legX + 18, legY + 17, viz.colors.red, 10, 'left');

                                // UV Catastrophe label if visible
                                if (T > 2000) {
                                    var uvX = plotL + ((300 - lamMin) / (lamMax - lamMin)) * plotW;
                                    if (uvX > plotL && uvX < plotR) {
                                        viz.screenText('UV catastrophe \u2191', Math.max(uvX, plotL + 60), plotT + 35, viz.colors.red, 10);
                                    }
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'At 3000 K, the object glows orange-ish. At 10000 K, it appears blue-white. Why does higher temperature produce bluer light?',
                        hint: 'Watch the peak of the spectrum as you raise the temperature.',
                        solution: 'Higher temperature shifts the peak of the blackbody spectrum to shorter wavelengths (Wien\'s law: \\(\\lambda_{\\text{max}} \\propto 1/T\\)). At 3000 K, the peak is in the infrared with significant red/orange in the visible range. At 10000 K, the peak moves into the blue/UV region, so the visible emission is dominated by shorter (bluer) wavelengths.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Wien's Law
            // ============================================================
            {
                id: 'wiens-law',
                title: "Wien's Law",
                content: `
<h2>The Peak Shifts with Temperature</h2>

<p>In 1893, Wilhelm Wien discovered a beautifully simple relationship: the wavelength at which a blackbody emits the most intensely is inversely proportional to its temperature.</p>

<div class="env-block theorem">
<div class="env-title">Wien's Displacement Law</div>
<div class="env-body">
\\[\\lambda_{\\text{max}} T = 2.898 \\times 10^{-3} \\text{ m} \\cdot \\text{K}\\]
<p>The peak wavelength \\(\\lambda_{\\text{max}}\\) is inversely proportional to the absolute temperature \\(T\\). Hotter objects peak at shorter wavelengths.</p>
</div>
</div>

<p>This law explains the universal color sequence of heated objects:</p>

<ul>
<li><strong>800 K</strong>: Peak at ~3600 nm (deep infrared). Barely visible dull red glow.</li>
<li><strong>3000 K</strong>: Peak at ~970 nm (near infrared). Glows orange-yellow; this is roughly the temperature of an incandescent light bulb filament.</li>
<li><strong>5778 K</strong>: Peak at ~502 nm (green). This is the Sun's surface temperature. The broad spectrum spanning the entire visible range makes sunlight appear white.</li>
<li><strong>10000 K</strong>: Peak at ~290 nm (ultraviolet). The visible emission is dominated by blue, giving a blue-white appearance. Stars like Sirius have this temperature.</li>
</ul>

<div class="env-block example">
<div class="env-title">Example: Temperature of a Star from Its Color</div>
<div class="env-body">
<p>The star Betelgeuse appears reddish and has a peak emission near 830 nm. What is its surface temperature?</p>
\\[T = \\frac{2.898 \\times 10^{-3}}{830 \\times 10^{-9}} \\approx 3490 \\text{ K}\\]
<p>Betelgeuse is a cool red supergiant, consistent with its ruddy color.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Why the Sun looks yellow, not green</div>
<div class="env-body">
<p>The Sun's peak emission is near 500 nm, which is green. But the Sun does not look green because it emits broadly across the entire visible spectrum; your eye integrates all these wavelengths into a sensation of white (or yellowish-white when viewed through the atmosphere, which scatters blue light away).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A kiln reaches 1500 K. At what wavelength does it emit most intensely? Is this in the visible range?',
                        hint: 'Use \\(\\lambda_{\\text{max}} = 2.898 \\times 10^{-3} / T\\).',
                        solution: '\\(\\lambda_{\\text{max}} = 2.898 \\times 10^{-3} / 1500 = 1.93 \\times 10^{-6}\\) m = 1930 nm. This is in the infrared, well beyond the visible range (400-700 nm). However, the tail of the distribution extends into the red end of the visible spectrum, so the kiln glows red.'
                    },
                    {
                        question: 'If you double the temperature of a blackbody, how does the total radiated power change?',
                        hint: 'The Stefan-Boltzmann law states \\(P \\propto T^4\\).',
                        solution: 'By the Stefan-Boltzmann law, \\(P = \\sigma A T^4\\). Doubling \\(T\\) increases the power by a factor of \\(2^4 = 16\\). A blackbody at 6000 K radiates 16 times more power per unit area than one at 3000 K.'
                    }
                ]
            },

            // ============================================================
            // Section 2: The Ultraviolet Catastrophe
            // ============================================================
            {
                id: 'uv-catastrophe',
                title: 'The Ultraviolet Catastrophe',
                content: `
<h2>Classical Physics Fails Spectacularly</h2>

<p>In the late 1800s, physicists tried to derive the blackbody spectrum from classical thermodynamics and electromagnetism. Lord Rayleigh and James Jeans applied the equipartition theorem, which says that each degree of freedom in thermal equilibrium gets an average energy of \\(\\frac{1}{2}k_BT\\). They treated each mode of electromagnetic oscillation in the cavity as a degree of freedom.</p>

<div class="env-block theorem">
<div class="env-title">Rayleigh-Jeans Law (Classical Prediction)</div>
<div class="env-body">
\\[B(\\lambda, T) = \\frac{2ck_BT}{\\lambda^4}\\]
<p>where \\(c\\) is the speed of light, \\(k_B\\) is Boltzmann's constant, and \\(\\lambda\\) is the wavelength.</p>
</div>
</div>

<p>This formula works reasonably well at long wavelengths (infrared). But as \\(\\lambda \\to 0\\) (toward the ultraviolet and beyond), the predicted intensity \\(B \\to \\infty\\). The classical theory predicts that a hot object should radiate an <em>infinite</em> amount of energy at short wavelengths.</p>

<div class="env-block definition">
<div class="env-title">Definition: The Ultraviolet Catastrophe</div>
<div class="env-body">
<p>The <strong>ultraviolet catastrophe</strong> is the dramatic failure of classical physics to describe blackbody radiation: the Rayleigh-Jeans law predicts infinite spectral intensity as wavelength approaches zero, which contradicts all observations. The total radiated energy would be infinite, which is physically absurd.</p>
</div>
</div>

<p>You can see this in the visualization: the red dashed curve (Rayleigh-Jeans) matches the white Planck curve at long wavelengths but shoots upward catastrophically at short wavelengths. Nature does not do this. Real blackbodies emit a finite, peaked spectrum. Something was deeply wrong with classical physics.</p>

<div class="env-block intuition">
<div class="env-title">Why equipartition fails</div>
<div class="env-body">
<p>Classical equipartition assigns the same energy \\(k_BT\\) to every electromagnetic mode, regardless of frequency. But there are infinitely many high-frequency modes (short wavelengths). If each one gets the same energy, the total is infinite. The resolution is that high-frequency modes do <em>not</em> get excited at typical temperatures; they are "frozen out." Explaining why required a revolutionary idea: energy quantization.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'At what wavelength does the Rayleigh-Jeans prediction roughly match the Planck curve? Where does it diverge?',
                        hint: 'The classical approximation works when the photon energy is much less than \\(k_BT\\).',
                        solution: 'The Rayleigh-Jeans law agrees with Planck at long wavelengths where \\(hc/\\lambda \\ll k_BT\\), i.e., \\(\\lambda \\gg hc/(k_BT)\\). For \\(T = 5000\\) K, this gives \\(\\lambda \\gg 2880\\) nm. At shorter wavelengths (higher frequencies), the classical prediction diverges upward from the observed spectrum.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Planck's Quantum
            // ============================================================
            {
                id: 'plancks-quantum',
                title: "Planck's Quantum",
                content: `
<h2>The Birth of Quantum Physics</h2>

<p>On December 14, 1900, Max Planck presented a revolutionary idea to the German Physical Society. To fix the ultraviolet catastrophe, he proposed that the energy of electromagnetic oscillators in the cavity walls is not continuous but comes in discrete packets, or <strong>quanta</strong>.</p>

<div class="env-block theorem">
<div class="env-title">Planck's Quantum Hypothesis</div>
<div class="env-body">
<p>An electromagnetic oscillator of frequency \\(\\nu\\) can only have energies that are integer multiples of a fundamental quantum:</p>
\\[E_n = nh\\nu, \\qquad n = 0, 1, 2, 3, \\ldots\\]
<p>where \\(h = 6.626 \\times 10^{-34}\\) J\\(\\cdot\\)s is <strong>Planck's constant</strong>.</p>
</div>
</div>

<p>This was an act of desperation, as Planck himself described it. He did not believe energy was truly quantized; he viewed it as a mathematical trick to get the right answer. But the trick worked perfectly, and it turned out to be far more than a trick.</p>

<h3>Why Quantization Solves the Catastrophe</h3>

<p>Consider a high-frequency mode with \\(h\\nu \\gg k_BT\\). To excite this mode requires adding at least one quantum of energy \\(h\\nu\\), which is much larger than the typical thermal energy \\(k_BT\\). The probability of such a large energy fluctuation is exponentially small: \\(\\sim e^{-h\\nu/(k_BT)}\\). So high-frequency modes remain unexcited, contributing essentially zero to the radiated energy. The ultraviolet catastrophe is tamed.</p>

<div class="env-block remark">
<div class="env-title">Planck's constant is tiny</div>
<div class="env-body">
<p>\\(h = 6.626 \\times 10^{-34}\\) J\\(\\cdot\\)s is extraordinarily small. For everyday oscillations (a swinging pendulum, a vibrating guitar string), the energy quanta \\(h\\nu\\) are so small compared to the total energy that quantization is utterly undetectable. You would never notice the energy arriving in steps. Only at atomic scales, where energies are comparably tiny, does quantization matter.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Energy of a Quantum</div>
<div class="env-body">
<p>For yellow light (\\(\\nu = 5 \\times 10^{14}\\) Hz):</p>
\\[E = h\\nu = (6.626 \\times 10^{-34})(5 \\times 10^{14}) = 3.3 \\times 10^{-19} \\text{ J} \\approx 2.1 \\text{ eV}\\]
<p>This is comparable to \\(k_BT \\approx 0.025\\) eV at room temperature, which is why thermal radiation at 300 K peaks in the infrared, not in the visible.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Calculate the energy of one quantum of (a) red light (\\(\\nu = 4 \\times 10^{14}\\) Hz) and (b) X-rays (\\(\\nu = 3 \\times 10^{18}\\) Hz).',
                        hint: 'Use \\(E = h\\nu\\) with \\(h = 6.626 \\times 10^{-34}\\) J s.',
                        solution: '(a) \\(E = 6.626 \\times 10^{-34} \\times 4 \\times 10^{14} = 2.65 \\times 10^{-19}\\) J \\(\\approx 1.66\\) eV. (b) \\(E = 6.626 \\times 10^{-34} \\times 3 \\times 10^{18} = 1.99 \\times 10^{-15}\\) J \\(\\approx 12{,}400\\) eV. X-ray quanta carry about 7500 times more energy than red-light quanta.'
                    },
                    {
                        question: 'At room temperature (\\(T = 300\\) K), what frequency of light has photon energy equal to \\(k_BT\\)?',
                        hint: 'Set \\(h\\nu = k_BT\\) and solve for \\(\\nu\\).',
                        solution: '\\(\\nu = k_BT / h = (1.381 \\times 10^{-23} \\times 300) / (6.626 \\times 10^{-34}) = 6.25 \\times 10^{12}\\) Hz. This is in the infrared (terahertz range), consistent with room-temperature objects emitting primarily in the infrared.'
                    }
                ]
            },

            // ============================================================
            // Section 4: The Planck Distribution
            // ============================================================
            {
                id: 'planck-distribution',
                title: 'The Planck Distribution',
                content: `
<h2>The Exact Spectrum</h2>

<p>Using his quantization hypothesis, Planck derived the exact formula for the blackbody spectrum. It fits all experimental data perfectly at all wavelengths and all temperatures.</p>

<div class="env-block theorem">
<div class="env-title">Planck's Radiation Law</div>
<div class="env-body">
\\[B(\\lambda, T) = \\frac{2hc^2}{\\lambda^5} \\cdot \\frac{1}{e^{hc/(\\lambda k_BT)} - 1}\\]
<p>where \\(B(\\lambda, T)\\) is the spectral radiance (power per unit area per unit wavelength per unit solid angle), \\(h\\) is Planck's constant, \\(c\\) is the speed of light, \\(\\lambda\\) is the wavelength, \\(k_B\\) is Boltzmann's constant, and \\(T\\) is the absolute temperature.</p>
</div>
</div>

<h3>Limiting Cases</h3>

<p>Planck's formula contains both classical physics and the new quantum physics as limiting cases:</p>

<ul>
<li><strong>Long wavelengths</strong> (\\(\\lambda \\to \\infty\\), or \\(hc/(\\lambda k_BT) \\ll 1\\)): The exponential can be approximated as \\(e^x \\approx 1 + x\\), giving \\(B \\approx 2ck_BT/\\lambda^4\\). This is exactly the Rayleigh-Jeans law. Classical physics works in this regime.</li>
<li><strong>Short wavelengths</strong> (\\(\\lambda \\to 0\\), or \\(hc/(\\lambda k_BT) \\gg 1\\)): The \\(-1\\) in the denominator becomes negligible, giving \\(B \\approx (2hc^2/\\lambda^5) e^{-hc/(\\lambda k_BT)}\\). The exponential suppresses the intensity, preventing the ultraviolet catastrophe.</li>
</ul>

<div class="env-block theorem">
<div class="env-title">Stefan-Boltzmann Law (from Planck)</div>
<div class="env-body">
<p>Integrating \\(B(\\lambda, T)\\) over all wavelengths gives the total radiated power per unit area:</p>
\\[j = \\sigma T^4\\]
<p>where \\(\\sigma = 5.67 \\times 10^{-8}\\) W m\\(^{-2}\\) K\\(^{-4}\\) is the Stefan-Boltzmann constant. This \\(T^4\\) dependence was known experimentally before Planck; his formula reproduces it exactly.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The beginning of quantum mechanics</div>
<div class="env-body">
<p>Planck's formula was the first equation of quantum physics. It introduced the fundamental constant \\(h\\) and the idea that energy exchange happens in discrete packets. Although Planck himself was conservative about the implications, Einstein, Bohr, and others would soon show that quantization was not a mathematical convenience but a deep truth about nature. The quantum revolution had begun.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Power Radiated by the Sun</div>
<div class="env-body">
<p>The Sun has surface temperature \\(T \\approx 5778\\) K and radius \\(R = 6.96 \\times 10^8\\) m. Its total luminosity is:</p>
\\[L = \\sigma T^4 \\cdot 4\\pi R^2 = (5.67 \\times 10^{-8})(5778)^4(4\\pi)(6.96 \\times 10^8)^2 \\approx 3.85 \\times 10^{26} \\text{ W}\\]
<p>This matches the measured solar luminosity, confirming that the Sun radiates approximately as a blackbody.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Show that Planck\'s formula reduces to the Rayleigh-Jeans law at long wavelengths by using the approximation \\(e^x \\approx 1 + x\\) for small \\(x\\).',
                        hint: 'Let \\(x = hc/(\\lambda k_BT)\\). For long wavelengths, \\(x \\ll 1\\).',
                        solution: 'When \\(hc/(\\lambda k_BT) \\ll 1\\), let \\(x = hc/(\\lambda k_BT)\\). Then \\(e^x - 1 \\approx x\\). Planck becomes \\(B \\approx \\frac{2hc^2}{\\lambda^5} \\cdot \\frac{1}{hc/(\\lambda k_BT)} = \\frac{2hc^2}{\\lambda^5} \\cdot \\frac{\\lambda k_BT}{hc} = \\frac{2ck_BT}{\\lambda^4}\\), which is the Rayleigh-Jeans law.'
                    },
                    {
                        question: 'A star has 4 times the Sun\'s surface temperature. How much more power per unit area does it radiate?',
                        hint: 'Apply the Stefan-Boltzmann law.',
                        solution: 'By \\(j = \\sigma T^4\\), the ratio of power per unit area is \\((4T_{\\odot})^4 / T_{\\odot}^4 = 256\\). The hotter star radiates 256 times more power per unit area.'
                    }
                ]
            }
        ]
    });
})();
