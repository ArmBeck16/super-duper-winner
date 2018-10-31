
function startWorker(thermImgData, msaImgData, minTemp, maxTemp) {
    var xtarget = msaImgData.data.length;
    var thermImgDataAr = thermImgData.data;
    var msaImgDataAr = msaImgData.data;
    for (var xidx = 0; xidx < xtarget && running; xidx += 4) {
        var temp = getTemp(thermImgDataAr[xidx],
            thermImgDataAr[xidx + 1],
            thermImgDataAr[xidx + 2]);
        if (minTemp < temp && temp < maxTemp) {
            msaImgDataAr[xidx] = thermImgDataAr[xidx];
            msaImgDataAr[xidx + 1] = thermImgDataAr[xidx + 1];
            msaImgDataAr[xidx + 2] = thermImgDataAr[xidx + 2];
        }
    }
    finished = running;
    running = false;
};
function getTemp(cc1, cc2, cc3) {
    var oIdx = 0;
    var i = 0;
    var c2 = colorComparision(cc1, cc2, cc3, colors[oIdx]);
    for (; i < colors.length; i++) {
        var c1 = colorComparision(cc1, cc2, cc3, colors[i]);
        if (c1 < c2) {
            oIdx = i;
            c2 = c1;
        }
    }
    return temps[oIdx];
}
function colorComparision(c1, c2, c3, color2) {
    return ((c1 - color2[0]) * (c1 - color2[0]) +
        (c2 - color2[1]) * (c2 - color2[1]) +
        (c3 - color2[2]) * (c3 - color2[2]));
}
