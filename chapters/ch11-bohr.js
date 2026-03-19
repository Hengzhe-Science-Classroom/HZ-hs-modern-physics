// === Chapter 11: Bohr Model & Hydrogen Spectra ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch11',
        number: 11,
        title: 'Bohr Model & Hydrogen Spectra',
        subtitle: 'Quantized orbits, photon emission, and the rainbow fingerprint of hydrogen',
        file: 'ch11-bohr',

        sections: [
            // ============================================================
            // Section 0: Quantized Orbits
            // ============================================================
            {
                id: 'quantized-orbits',
                title: 'Quantized Orbits',
                content: `
<h2>Only Certain Orbits Are Allowed</h2>

<p>Rutherford's nuclear model explained scattering but could not explain why atoms are stable. Classical electrodynamics demands that any accelerating charge radiates energy. An orbiting electron is constantly accelerating (centripetal), so it should spiral into the nucleus in about \\(10^{-11}\\) seconds, emitting a continuous spectrum of radiation as it falls. But atoms are stable, and they emit light only at specific wavelengths.</p>

<p>In 1913, Niels Bohr made a bold move: he simply declared that certain orbits are exempt from radiation. The electron can only exist in specific stationary states, and it does not radiate while in these states.</p>

<div class="env-block theorem">
<div class="env-title">Bohr's Quantization Condition</div>
<div class="env-body">
<p>The electron's orbital angular momentum is quantized in integer multiples of \\(\\hbar\\):</p>
\\[L = m_e v r = n\\hbar, \\qquad n = 1, 2, 3, \\ldots\\]
<p>where \\(\\hbar = h/(2\\pi) = 1.055 \\times 10^{-34}\\) J s.</p>
</div>
</div>

<p>Combining this quantization condition with the classical force balance (Coulomb attraction = centripetal force) yields the allowed orbital radii:</p>

\\[r_n = n^2 a_0, \\qquad a_0 = \\frac{4\\pi\\epsilon_0 \\hbar^2}{m_e e^2} = 0.529\\;\\text{angstrom}\\]

<p>The radii grow as \\(n^2\\): the first orbit has radius \\(a_0\\), the second has \\(4a_0\\), the third \\(9a_0\\), and so on. Higher orbits are dramatically farther from the nucleus.</p>

<div class="env-block intuition">
<div class="env-title">de Broglie's later justification</div>
<div class="env-body">
<p>In 1924, de Broglie gave a physical reason for Bohr's seemingly arbitrary quantization: the electron has a wavelength \\(\\lambda = h/(m_e v)\\), and only orbits whose circumference equals an integer number of wavelengths can support a standing wave. Otherwise the wave interferes destructively with itself. This gives \\(2\\pi r = n\\lambda\\), which is equivalent to Bohr's \\(L = n\\hbar\\).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-bohr-showpiece"></div>
`,
                visualizations: [
                    {
                        id: 'viz-bohr-showpiece',
                        title: 'Bohr Atom: Transitions & Spectra',
                        description: 'A hydrogen atom with quantized orbits \\(n = 1\\) through \\(n = 6\\). Click an orbit to move the electron there. When the electron drops to a lower level, a photon is emitted with the correct color. The <strong>energy level diagram</strong> (left) shows the transition arrow. The <strong>spectrum bar</strong> (bottom) accumulates emission lines color-coded by series: <span style="color:#bc8cff">Lyman (UV)</span>, <span style="color:#f85149">Balmer (visible)</span>, <span style="color:#f0883e">Paschen (IR)</span>.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Atom center (right portion)
                            var atomCx = w * 0.58, atomCy = h * 0.42;

                            // Orbit radii on screen (scaled for display, not physical)
                            var maxOrbit = 6;
                            var orbitScale = 28; // pixels per n
                            function orbitR(n) { return n * orbitScale; }

                            // Energy levels
                            function energy(n) { return -13.6 / (n * n); } // eV

                            // Current electron state
                            var electronN = 1;
                            var electronAngle = 0;
                            var targetN = 1;
                            var transitionTimer = 0;
                            var transitionFrom = 1;
                            var transitionTo = 1;
                            var photonEmitted = false;
                            var photonX = 0, photonY = 0, photonVx = 0, photonVy = 0;
                            var photonColor = '';
                            var photonAlpha = 0;
                            var photonGlowR = 0;

                            // Spectrum accumulator
                            var spectrumLines = []; // {wavelength, color, series}

                            // Wavelength to color
                            function wavelengthToColor(nm) {
                                if (nm < 380) return viz.colors.purple;
                                if (nm < 440) return VizEngine.hsl(270 - (nm - 380) / 60 * 30, 90, 55);
                                if (nm < 490) return VizEngine.hsl(240 - (nm - 440) / 50 * 60, 90, 55);
                                if (nm < 510) return VizEngine.hsl(180 - (nm - 490) / 20 * 60, 90, 50);
                                if (nm < 580) return VizEngine.hsl(120 - (nm - 510) / 70 * 60, 90, 50);
                                if (nm < 645) return VizEngine.hsl(60 - (nm - 580) / 65 * 60, 90, 50);
                                if (nm < 780) return VizEngine.hsl(0, 90, 45);
                                return viz.colors.red;
                            }

                            function transitionWavelength(ni, nf) {
                                // 1/lambda = R*(1/nf^2 - 1/ni^2), R = 1.097e7 /m
                                var invLambda = 1.097e7 * (1 / (nf * nf) - 1 / (ni * ni));
                                return 1e9 / invLambda; // nm
                            }

                            function seriesName(nf) {
                                if (nf === 1) return 'Lyman';
                                if (nf === 2) return 'Balmer';
                                if (nf === 3) return 'Paschen';
                                if (nf === 4) return 'Brackett';
                                return 'n=' + nf;
                            }

                            function seriesColor(nf) {
                                if (nf === 1) return viz.colors.purple;
                                if (nf === 2) return viz.colors.red;
                                if (nf === 3) return viz.colors.orange;
                                return viz.colors.yellow;
                            }

                            // Click to select orbit
                            viz.canvas.addEventListener('click', function (e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                var dx = mx - atomCx;
                                var dy = my - atomCy;
                                var dist = Math.sqrt(dx * dx + dy * dy);

                                // Find closest orbit
                                var closest = 1;
                                var closestDist = 9999;
                                for (var ni = 1; ni <= maxOrbit; ni++) {
                                    var d = Math.abs(dist - orbitR(ni));
                                    if (d < closestDist) {
                                        closestDist = d;
                                        closest = ni;
                                    }
                                }

                                if (closestDist < 18 && closest !== electronN) {
                                    targetN = closest;
                                    transitionFrom = electronN;
                                    transitionTo = closest;
                                    transitionTimer = 1.0;

                                    if (closest < electronN) {
                                        // Emission
                                        var wl = transitionWavelength(electronN, closest);
                                        var col = (wl >= 380 && wl <= 780) ? wavelengthToColor(wl) : seriesColor(closest);
                                        photonEmitted = true;
                                        photonX = atomCx + orbitR(electronN) * Math.cos(electronAngle);
                                        photonY = atomCy + orbitR(electronN) * Math.sin(electronAngle);
                                        var pAngle = electronAngle + Math.PI / 4;
                                        photonVx = Math.cos(pAngle) * 100;
                                        photonVy = Math.sin(pAngle) * 100;
                                        photonColor = col;
                                        photonAlpha = 1.0;
                                        photonGlowR = 15;

                                        // Add to spectrum
                                        var already = false;
                                        for (var si = 0; si < spectrumLines.length; si++) {
                                            if (Math.abs(spectrumLines[si].wavelength - wl) < 1) { already = true; break; }
                                        }
                                        if (!already) {
                                            spectrumLines.push({
                                                wavelength: wl,
                                                color: col,
                                                series: seriesName(closest),
                                                from: electronN,
                                                to: closest
                                            });
                                        }
                                    }
                                    electronN = closest;
                                }
                            });

                            // Buttons for quick jumps
                            for (var bn = 1; bn <= 6; bn++) {
                                (function (level) {
                                    VizEngine.createButton(controls, 'n=' + level, function () {
                                        if (level !== electronN) {
                                            transitionFrom = electronN;
                                            transitionTo = level;
                                            transitionTimer = 1.0;

                                            if (level < electronN) {
                                                var wl = transitionWavelength(electronN, level);
                                                var col = (wl >= 380 && wl <= 780) ? wavelengthToColor(wl) : seriesColor(level);
                                                photonEmitted = true;
                                                photonX = atomCx + orbitR(electronN) * Math.cos(electronAngle);
                                                photonY = atomCy + orbitR(electronN) * Math.sin(electronAngle);
                                                var pAngle = electronAngle + Math.PI / 4;
                                                photonVx = Math.cos(pAngle) * 100;
                                                photonVy = Math.sin(pAngle) * 100;
                                                photonColor = col;
                                                photonAlpha = 1.0;
                                                photonGlowR = 15;

                                                var already = false;
                                                for (var si = 0; si < spectrumLines.length; si++) {
                                                    if (Math.abs(spectrumLines[si].wavelength - wl) < 1) { already = true; break; }
                                                }
                                                if (!already) {
                                                    spectrumLines.push({
                                                        wavelength: wl,
                                                        color: col,
                                                        series: seriesName(level),
                                                        from: electronN,
                                                        to: level
                                                    });
                                                }
                                            }
                                            electronN = level;
                                        }
                                    });
                                })(bn);
                            }

                            VizEngine.createButton(controls, 'Clear spectrum', function () {
                                spectrumLines = [];
                            });

                            var lastTime = performance.now();

                            function draw(now) {
                                var dt = Math.min((now - lastTime) / 1000, 0.03);
                                lastTime = now;

                                // Electron orbital speed (faster for lower n)
                                electronAngle += dt * (3.0 / electronN);
                                if (transitionTimer > 0) transitionTimer -= dt * 2;

                                viz.clear();

                                // === Energy Level Diagram (left side) ===
                                var elL = 15, elR = w * 0.28;
                                var elT = 20, elB = h * 0.75;
                                var elW = elR - elL, elH = elB - elT;

                                ctx.fillStyle = '#0a0a1a';
                                ctx.fillRect(elL, elT, elW, elH);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(elL, elT, elW, elH);
                                viz.screenText('Energy Levels', elL + elW / 2, elT - 8, viz.colors.white, 11);

                                // Draw energy levels
                                var eMin = -14, eMax = 1; // eV range
                                function eToY(e) { return elB - ((e - eMin) / (eMax - eMin)) * elH; }

                                for (var nl = 1; nl <= maxOrbit; nl++) {
                                    var ey = eToY(energy(nl));
                                    var isActive = (nl === electronN);
                                    ctx.strokeStyle = isActive ? viz.colors.cyan : viz.colors.axis;
                                    ctx.lineWidth = isActive ? 2.5 : 1;
                                    ctx.beginPath();
                                    ctx.moveTo(elL + 35, ey);
                                    ctx.lineTo(elR - 8, ey);
                                    ctx.stroke();

                                    // Labels
                                    ctx.fillStyle = isActive ? viz.colors.cyan : viz.colors.text;
                                    ctx.font = (isActive ? 'bold ' : '') + '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'right';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText('n=' + nl, elL + 30, ey);
                                    ctx.textAlign = 'left';
                                    ctx.fillText(energy(nl).toFixed(2) + ' eV', elR - 6, ey - 10);
                                }

                                // Ionization level
                                var ionY = eToY(0);
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(elL + 35, ionY);
                                ctx.lineTo(elR - 8, ionY);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('0 eV (free)', elR - 6, ionY - 10, viz.colors.text, 9, 'left');

                                // Transition arrow
                                if (transitionTimer > 0) {
                                    var y1 = eToY(energy(transitionFrom));
                                    var y2 = eToY(energy(transitionTo));
                                    var arrowX = elL + elW / 2 + 10;
                                    var arrowAlpha = VizEngine.clamp(transitionTimer, 0, 1);
                                    ctx.save();
                                    ctx.globalAlpha = arrowAlpha;
                                    var arrowColor = transitionTo < transitionFrom ? viz.colors.red : viz.colors.blue;
                                    ctx.strokeStyle = arrowColor;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    ctx.moveTo(arrowX, y1);
                                    ctx.lineTo(arrowX, y2);
                                    ctx.stroke();
                                    // Arrowhead
                                    var headDir = y2 > y1 ? 1 : -1;
                                    ctx.fillStyle = arrowColor;
                                    ctx.beginPath();
                                    ctx.moveTo(arrowX, y2);
                                    ctx.lineTo(arrowX - 5, y2 - headDir * 8);
                                    ctx.lineTo(arrowX + 5, y2 - headDir * 8);
                                    ctx.closePath();
                                    ctx.fill();

                                    // Photon energy label
                                    var dE = Math.abs(energy(transitionFrom) - energy(transitionTo));
                                    viz.screenText(dE.toFixed(2) + ' eV', arrowX + 12, (y1 + y2) / 2, arrowColor, 10, 'left');
                                    ctx.restore();
                                }

                                // === Bohr Atom (right side) ===
                                // Draw orbits
                                for (var no = 1; no <= maxOrbit; no++) {
                                    var oR = orbitR(no);
                                    ctx.strokeStyle = (no === electronN) ? viz.colors.cyan + '88' : viz.colors.axis + '33';
                                    ctx.lineWidth = (no === electronN) ? 1.5 : 0.7;
                                    ctx.beginPath();
                                    ctx.arc(atomCx, atomCy, oR, 0, Math.PI * 2);
                                    ctx.stroke();
                                    // Label
                                    viz.screenText(no.toString(), atomCx + oR + 6, atomCy - 6, viz.colors.text, 9, 'left');
                                }

                                // Nucleus
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 12;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.arc(atomCx, atomCy, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                                viz.screenText('p+', atomCx, atomCy, viz.colors.white, 8);

                                // Electron
                                var eR = orbitR(electronN);
                                var ex = atomCx + eR * Math.cos(electronAngle);
                                var ey2 = atomCy + eR * Math.sin(electronAngle);
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 15;
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.beginPath();
                                ctx.arc(ex, ey2, 5, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                                // Electron trail (fading arc)
                                ctx.strokeStyle = viz.colors.cyan + '44';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(atomCx, atomCy, eR, electronAngle - 1.2, electronAngle);
                                ctx.stroke();

                                // Photon animation
                                if (photonEmitted && photonAlpha > 0.01) {
                                    photonX += photonVx * dt;
                                    photonY += photonVy * dt;
                                    photonAlpha -= dt * 0.8;
                                    photonGlowR += dt * 30;

                                    ctx.save();
                                    ctx.globalAlpha = VizEngine.clamp(photonAlpha, 0, 1);
                                    // Glow
                                    var pGrad = ctx.createRadialGradient(photonX, photonY, 2, photonX, photonY, photonGlowR);
                                    pGrad.addColorStop(0, photonColor + 'aa');
                                    pGrad.addColorStop(1, photonColor + '00');
                                    ctx.fillStyle = pGrad;
                                    ctx.beginPath();
                                    ctx.arc(photonX, photonY, photonGlowR, 0, Math.PI * 2);
                                    ctx.fill();
                                    // Core
                                    ctx.fillStyle = photonColor;
                                    ctx.beginPath();
                                    ctx.arc(photonX, photonY, 4, 0, Math.PI * 2);
                                    ctx.fill();
                                    // Wavy line
                                    ctx.strokeStyle = photonColor;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    for (var wi = 0; wi < 20; wi++) {
                                        var wx = photonX - wi * photonVx * 0.005;
                                        var wy = photonY - wi * photonVy * 0.005 + Math.sin(wi * 1.2) * 4;
                                        if (wi === 0) ctx.moveTo(wx, wy);
                                        else ctx.lineTo(wx, wy);
                                    }
                                    ctx.stroke();
                                    ctx.restore();
                                }

                                // === Spectrum Bar (bottom) ===
                                var specL = 15, specR = w - 15;
                                var specT = h * 0.82, specB = h - 8;
                                var specW = specR - specL, specH = specB - specT;

                                // Background (dark)
                                ctx.fillStyle = '#050510';
                                ctx.fillRect(specL, specT, specW, specH);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(specL, specT, specW, specH);

                                // Wavelength range: 80nm to 2000nm (log scale)
                                var wlMin = 80, wlMax = 2000;
                                function wlToX(wl) {
                                    var logMin = Math.log(wlMin);
                                    var logMax = Math.log(wlMax);
                                    return specL + ((Math.log(wl) - logMin) / (logMax - logMin)) * specW;
                                }

                                // Visible light band
                                var visL = wlToX(380), visR2 = wlToX(780);
                                var visGrad = ctx.createLinearGradient(visL, 0, visR2, 0);
                                visGrad.addColorStop(0, 'rgba(128,0,255,0.15)');
                                visGrad.addColorStop(0.2, 'rgba(0,0,255,0.15)');
                                visGrad.addColorStop(0.35, 'rgba(0,200,200,0.15)');
                                visGrad.addColorStop(0.5, 'rgba(0,255,0,0.15)');
                                visGrad.addColorStop(0.65, 'rgba(255,255,0,0.15)');
                                visGrad.addColorStop(0.85, 'rgba(255,128,0,0.15)');
                                visGrad.addColorStop(1, 'rgba(255,0,0,0.15)');
                                ctx.fillStyle = visGrad;
                                ctx.fillRect(visL, specT, visR2 - visL, specH);
                                viz.screenText('visible', (visL + visR2) / 2, specT - 4, viz.colors.text, 8);
                                viz.screenText('UV', wlToX(200), specT - 4, viz.colors.purple, 8);
                                viz.screenText('IR', wlToX(1200), specT - 4, viz.colors.orange, 8);

                                // Wavelength ticks
                                var tickWLs = [100, 200, 400, 600, 800, 1000, 1500];
                                for (var tw = 0; tw < tickWLs.length; tw++) {
                                    var tx = wlToX(tickWLs[tw]);
                                    ctx.strokeStyle = viz.colors.axis + '55';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(tx, specT);
                                    ctx.lineTo(tx, specB);
                                    ctx.stroke();
                                    viz.screenText(tickWLs[tw] + '', tx, specB + 6, viz.colors.text, 7);
                                }

                                // Draw accumulated emission lines
                                for (var sl = 0; sl < spectrumLines.length; sl++) {
                                    var line = spectrumLines[sl];
                                    var lx = wlToX(line.wavelength);
                                    if (lx < specL || lx > specR) continue;
                                    // Glow
                                    ctx.save();
                                    ctx.shadowColor = line.color;
                                    ctx.shadowBlur = 6;
                                    ctx.strokeStyle = line.color;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    ctx.moveTo(lx, specT + 2);
                                    ctx.lineTo(lx, specB - 2);
                                    ctx.stroke();
                                    ctx.restore();
                                }

                                // Series legend
                                var legX = w * 0.32;
                                var legY2 = h * 0.77;
                                viz.screenText('Emission Spectrum (nm)', w / 2, specT - 14, viz.colors.white, 10);

                                // Instruction
                                viz.screenText('Click an orbit or button to move electron', atomCx, h * 0.78, viz.colors.text, 9);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why does Bohr\'s quantization condition \\(L = n\\hbar\\) imply discrete energy levels?',
                        hint: 'If the radius can only take discrete values \\(r_n = n^2 a_0\\), what does that imply for the total energy?',
                        solution: 'The total energy depends on the orbital radius: \\(E = -k_e e^2 / (2r)\\). Since \\(r\\) is restricted to \\(r_n = n^2 a_0\\), the energy can only take the values \\(E_n = -13.6/n^2\\) eV. Continuous energy values are forbidden because they would require orbital radii that violate the quantization condition.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Energy Levels
            // ============================================================
            {
                id: 'energy-levels',
                title: 'Energy Levels',
                content: `
<h2>The Hydrogen Energy Ladder</h2>

<p>The allowed energies of the hydrogen atom form a simple pattern:</p>

<div class="env-block theorem">
<div class="env-title">Hydrogen Energy Levels</div>
<div class="env-body">
\\[E_n = -\\frac{13.6\\;\\text{eV}}{n^2}, \\qquad n = 1, 2, 3, \\ldots\\]
<p>The negative sign means the electron is bound. \\(E_1 = -13.6\\) eV is the <strong>ground state</strong> (most tightly bound). As \\(n \\to \\infty\\), \\(E_n \\to 0\\), corresponding to a free electron (ionization).</p>
</div>
</div>

<h3>Key Features</h3>

<ul>
<li><strong>Ground state</strong> (\\(n = 1\\)): \\(E_1 = -13.6\\) eV. The electron is as close to the nucleus as Bohr's model allows.</li>
<li><strong>First excited state</strong> (\\(n = 2\\)): \\(E_2 = -3.4\\) eV. It takes \\(13.6 - 3.4 = 10.2\\) eV to excite the electron from \\(n = 1\\) to \\(n = 2\\).</li>
<li><strong>Ionization energy</strong>: 13.6 eV. This is the energy needed to completely remove the electron from the ground state.</li>
<li>The levels get closer together as \\(n\\) increases, crowding toward \\(E = 0\\).</li>
</ul>

<div class="env-block example">
<div class="env-title">Example: Energy Gaps</div>
<div class="env-body">
<p>Gap between \\(n = 1\\) and \\(n = 2\\): \\(\\Delta E = -3.4 - (-13.6) = 10.2\\) eV</p>
<p>Gap between \\(n = 2\\) and \\(n = 3\\): \\(\\Delta E = -1.51 - (-3.4) = 1.89\\) eV</p>
<p>Gap between \\(n = 3\\) and \\(n = 4\\): \\(\\Delta E = -0.85 - (-1.51) = 0.66\\) eV</p>
<p>The gaps decrease rapidly. Most of the energy scale is between \\(n = 1\\) and \\(n = 2\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The energy-level staircase</div>
<div class="env-body">
<p>Imagine a staircase where the first step is very tall (10.2 eV), the second step is shorter (1.89 eV), and each subsequent step is shorter still. The electron can only stand on the steps, never between them. At the top of the staircase (\\(E = 0\\)), the electron is free.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'What is the longest wavelength photon that can ionize a hydrogen atom in the ground state?',
                        hint: 'The minimum energy to ionize is 13.6 eV. Use \\(E = hc/\\lambda\\).',
                        solution: '\\(\\lambda = hc/E = (6.626 \\times 10^{-34})(3 \\times 10^8) / (13.6 \\times 1.6 \\times 10^{-19}) = 91.2\\) nm. This is in the far ultraviolet.'
                    },
                    {
                        question: 'How many times more energy does it take to excite hydrogen from \\(n = 1\\) to \\(n = 2\\) compared to \\(n = 2\\) to \\(n = 3\\)?',
                        hint: 'Compute both energy gaps and take the ratio.',
                        solution: '\\(\\Delta E_{1 \\to 2} = 10.2\\) eV, \\(\\Delta E_{2 \\to 3} = 1.89\\) eV. Ratio: \\(10.2 / 1.89 = 5.4\\). The first excitation requires 5.4 times more energy.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Photon Emission and Absorption
            // ============================================================
            {
                id: 'emission-absorption',
                title: 'Photon Emission & Absorption',
                content: `
<h2>Quantum Jumps</h2>

<p>When an electron transitions between two energy levels, it must either absorb or emit a photon whose energy exactly matches the energy difference:</p>

<div class="env-block theorem">
<div class="env-title">Photon Energy in Transitions</div>
<div class="env-body">
\\[E_{\\text{photon}} = h\\nu = |E_i - E_f| = 13.6\\;\\text{eV}\\left|\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right|\\]
<p><strong>Emission</strong>: electron drops from higher \\(n_i\\) to lower \\(n_f\\) (\\(n_i > n_f\\)), releasing a photon.</p>
<p><strong>Absorption</strong>: electron jumps from lower \\(n_i\\) to higher \\(n_f\\) (\\(n_f > n_i\\)), absorbing an incoming photon.</p>
</div>
</div>

<p>The photon frequency and wavelength follow:</p>

\\[\\nu = \\frac{E_{\\text{photon}}}{h}, \\qquad \\lambda = \\frac{hc}{E_{\\text{photon}}} = \\frac{c}{\\nu}\\]

<div class="env-block remark">
<div class="env-title">Only exact energies work</div>
<div class="env-body">
<p>An atom can only absorb a photon if its energy exactly matches a transition. A photon with slightly too much or too little energy will not be absorbed; it passes through. This is why gases absorb only at specific wavelengths, producing dark absorption lines in a continuous spectrum.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: The Red Balmer-alpha Line</div>
<div class="env-body">
<p>The transition \\(n = 3 \\to n = 2\\) emits:</p>
\\[E = 13.6\\left(\\frac{1}{4} - \\frac{1}{9}\\right) = 13.6 \\times 0.1389 = 1.89\\;\\text{eV}\\]
\\[\\lambda = \\frac{1240\\;\\text{eV nm}}{1.89\\;\\text{eV}} = 656\\;\\text{nm (red)}\\]
<p>This is the famous H-alpha line, visible as a bright red glow in hydrogen discharge tubes and nebulae.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Calculate the wavelength of the photon emitted when an electron drops from \\(n = 4\\) to \\(n = 2\\) (the H-beta line). Is it visible?',
                        hint: 'Use \\(E = 13.6(1/n_f^2 - 1/n_i^2)\\) and \\(\\lambda = 1240/E\\) (with E in eV, \\(\\lambda\\) in nm).',
                        solution: '\\(E = 13.6(1/4 - 1/16) = 13.6 \\times 0.1875 = 2.55\\) eV. \\(\\lambda = 1240/2.55 = 486\\) nm. This is blue-green (cyan), visible to the eye. It is the second line of the Balmer series.'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Hydrogen Spectrum
            // ============================================================
            {
                id: 'hydrogen-spectrum',
                title: 'The Hydrogen Spectrum',
                content: `
<h2>Spectral Series</h2>

<p>The emission lines of hydrogen are organized into <strong>series</strong>, each corresponding to transitions ending at a particular lower level \\(n_f\\):</p>

<div class="env-block theorem">
<div class="env-title">Rydberg Formula</div>
<div class="env-body">
\\[\\frac{1}{\\lambda} = R_\\infty \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right), \\qquad R_\\infty = 1.097 \\times 10^7\\;\\text{m}^{-1}\\]
<p>where \\(n_i > n_f\\) and \\(R_\\infty\\) is the Rydberg constant.</p>
</div>
</div>

<h3>Named Series</h3>

<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="border-bottom:1px solid #30363d;">
<th style="text-align:left;padding:6px;">Series</th>
<th style="text-align:center;padding:6px;">\\(n_f\\)</th>
<th style="text-align:center;padding:6px;">\\(n_i\\)</th>
<th style="text-align:center;padding:6px;">Region</th>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
<td style="padding:6px;">Lyman</td>
<td style="text-align:center;">1</td>
<td style="text-align:center;">2, 3, 4, ...</td>
<td style="text-align:center;">Ultraviolet</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
<td style="padding:6px;">Balmer</td>
<td style="text-align:center;">2</td>
<td style="text-align:center;">3, 4, 5, ...</td>
<td style="text-align:center;">Visible / near UV</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
<td style="padding:6px;">Paschen</td>
<td style="text-align:center;">3</td>
<td style="text-align:center;">4, 5, 6, ...</td>
<td style="text-align:center;">Infrared</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
<td style="padding:6px;">Brackett</td>
<td style="text-align:center;">4</td>
<td style="text-align:center;">5, 6, 7, ...</td>
<td style="text-align:center;">Infrared</td>
</tr>
<tr>
<td style="padding:6px;">Pfund</td>
<td style="text-align:center;">5</td>
<td style="text-align:center;">6, 7, 8, ...</td>
<td style="text-align:center;">Far infrared</td>
</tr>
</table>

<p>The Balmer series is the most famous because its lines fall in the visible spectrum. The first four Balmer lines are:</p>
<ul>
<li>H-\\(\\alpha\\): 656 nm (red)</li>
<li>H-\\(\\beta\\): 486 nm (cyan)</li>
<li>H-\\(\\gamma\\): 434 nm (blue-violet)</li>
<li>H-\\(\\delta\\): 410 nm (violet)</li>
</ul>

<div class="env-block remark">
<div class="env-title">Series limits</div>
<div class="env-body">
<p>Each series has a <strong>series limit</strong> where \\(n_i \\to \\infty\\). For the Balmer series, this limit is \\(\\lambda = 4/(R_\\infty) = 364.6\\) nm (near UV). Beyond this wavelength, the lines crowd together and merge into a continuous spectrum (the ionization continuum).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Calculate the shortest wavelength in the Lyman series (the series limit, \\(n_i \\to \\infty\\)).',
                        hint: 'Use the Rydberg formula with \\(n_f = 1\\) and \\(1/n_i^2 \\to 0\\).',
                        solution: '\\(1/\\lambda = R_\\infty (1/1 - 0) = 1.097 \\times 10^7\\) m\\(^{-1}\\). \\(\\lambda = 91.2\\) nm. This is in the far ultraviolet and corresponds to the ionization energy of hydrogen (13.6 eV).'
                    },
                    {
                        question: 'The Balmer series limit is 364.6 nm. What is the energy of a photon at this wavelength?',
                        hint: 'Use \\(E = hc/\\lambda = 1240\\text{ eV nm}/\\lambda\\).',
                        solution: '\\(E = 1240/364.6 = 3.40\\) eV. This equals the binding energy of \\(n = 2\\) (\\(E_2 = -3.4\\) eV), confirming that the Balmer series limit corresponds to ionization from the \\(n = 2\\) level.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Beyond Hydrogen
            // ============================================================
            {
                id: 'beyond-hydrogen',
                title: 'Beyond Hydrogen',
                content: `
<h2>Limitations of the Bohr Model</h2>

<p>Bohr's model works beautifully for hydrogen and hydrogen-like ions (\\(\\text{He}^+\\), \\(\\text{Li}^{2+}\\), etc., which have one electron). For these systems, simply replace \\(e^2\\) with \\(Ze^2\\):</p>

\\[E_n = -\\frac{13.6\\;Z^2}{n^2}\\;\\text{eV}\\]

<div class="env-block example">
<div class="env-title">Example: Ionized Helium (He\\(^+\\))</div>
<div class="env-body">
<p>\\(\\text{He}^+\\) has \\(Z = 2\\) and one electron. Its ground state energy is:</p>
\\[E_1 = -13.6 \\times 4 = -54.4\\;\\text{eV}\\]
<p>The ionization energy is 54.4 eV, four times that of hydrogen.</p>
</div>
</div>

<h3>Where Bohr Fails</h3>

<p>For atoms with two or more electrons, Bohr's model cannot account for:</p>

<ul>
<li><strong>Electron-electron repulsion</strong>: In multi-electron atoms, electrons repel each other, complicating the force balance. Bohr's model only considers the electron-nucleus attraction.</li>
<li><strong>Fine structure</strong>: High-resolution spectroscopy reveals that many "single" spectral lines are actually closely spaced doublets or multiplets. Bohr cannot explain this splitting.</li>
<li><strong>Zeeman effect</strong>: In a magnetic field, spectral lines split into multiple components. Bohr's model predicts some splitting but gets the pattern wrong for many cases (the "anomalous" Zeeman effect).</li>
<li><strong>Orbital shapes</strong>: Bohr's circular orbits cannot explain chemical bonding, molecular geometry, or the structure of the periodic table.</li>
</ul>

<div class="env-block theorem">
<div class="env-title">What Bohr Got Right</div>
<div class="env-body">
<ol>
<li>Energy is quantized; atoms have discrete energy levels.</li>
<li>Radiation is emitted/absorbed in transitions between levels.</li>
<li>The Rydberg formula for hydrogen spectra.</li>
<li>The concept of a ground state and excited states.</li>
<li>The idea that classical mechanics fails at the atomic scale.</li>
</ol>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Bohr as a bridge</div>
<div class="env-body">
<p>Bohr's model is not wrong; it is incomplete. It correctly captures the essential idea (quantization) but uses a classical picture (definite orbits) that nature does not support. Think of it as the right answer expressed in the wrong language. Quantum mechanics would soon provide the correct language, but Bohr's insights paved the way.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Calculate the ground-state energy and ionization energy of \\(\\text{Li}^{2+}\\) (\\(Z = 3\\), one electron).',
                        hint: 'Use \\(E_n = -13.6 Z^2/n^2\\).',
                        solution: '\\(E_1 = -13.6 \\times 9 / 1 = -122.4\\) eV. The ionization energy is 122.4 eV.'
                    },
                    {
                        question: 'Why can\'t the Bohr model explain the spectrum of helium (\\(Z = 2\\), two electrons)?',
                        hint: 'What force does Bohr\'s model neglect when there are two electrons?',
                        solution: 'Bohr\'s model treats each electron independently, considering only the electron-nucleus Coulomb attraction. With two electrons, the electron-electron repulsion significantly alters the energy levels. The resulting three-body problem has no simple closed-form solution, and the actual energy levels differ substantially from what Bohr\'s formula predicts.'
                    }
                ]
            }
        ]
    });
})();
