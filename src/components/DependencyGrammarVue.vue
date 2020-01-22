<template>
    <div style="width: 100%">
        <canvas :id="id" height="350"></canvas>
    </div>

</template>

<script>
  export default {
    props: ['id', 'dataTitle', 'relations', 'positions'],
    name: "DependencyGrammarVue",
    data() {
      return {};
    },
    computed: {},
    mounted() {
      const _this = this
      this.$nextTick(() => {
        var c = document.getElementById(this.id);
        var ctx = c.getContext("2d");
        let words = this.dataTitle
        let relations= this.relations
        let positions = this.positions
        var nu = words.length
        var wPoint = 10;
        var hPoint = 300;
        var wid = 80;
        var hei = 30;
        var top0 = 22;
        var top1 = 42;
        var xspa = 5;
        var yspa = hPoint / positions.length + 8;
        c.setAttribute("width", wPoint + (wPoint + wid) * nu);

        for (var i = 0; i < nu; i++) {

          ctx.font = "16px Microsoft YaHei";
          ctx.textAlign = "center";
          ctx.fillStyle = "#353131";
          ctx.fillText(words[i], wPoint + wid / 2 + (wPoint + wid) * i,
            hPoint + top0);
          var j = i - 1;
          if (i > 0) {

            ctx.strokeStyle = "#1a9300";

            var k1x = wPoint + wid / 2 + (wPoint + wid) * i;
            var k1y = hPoint - Math.abs(i - positions[j]) * yspa;
            var k2y = hPoint - Math.abs(i - positions[j]) * yspa;
            var jy = hPoint - 5;
            if (i > positions[j]) {
              var k2x = wPoint + wid / 2 + (wPoint + wid) * positions[j]
                + xspa;
              var jx = wPoint + wid / 2 + (wPoint + wid) * positions[j]
                + xspa;
            } else {
              var k2x = wPoint + wid / 2 + (wPoint + wid) * positions[j]
                - xspa;
              var jx = wPoint + wid / 2 + (wPoint + wid) * positions[j]
                - xspa;
            }
            ctx.beginPath();
            ctx.moveTo(wPoint + wid / 2 + (wPoint + wid) * i, hPoint);
            ctx.bezierCurveTo(k1x, k1y, k2x, k2y, jx, jy);
            ctx.stroke();

            ctx.beginPath();
            if (i > positions[j]) {
              ctx.moveTo(wPoint + wid / 2 + (wPoint + wid) * positions[j]
                + xspa, hPoint);
              ctx.lineTo(wPoint + wid / 2 + (wPoint + wid) * positions[j]
                + xspa + 5, hPoint - 5);
              ctx.lineTo(wPoint + wid / 2 + (wPoint + wid) * positions[j]
                + xspa - 5, hPoint - 5);
            } else {
              ctx.moveTo(wPoint + wid / 2 + (wPoint + wid) * positions[j]
                - xspa, hPoint);
              ctx.lineTo(wPoint + wid / 2 + (wPoint + wid) * positions[j]
                - xspa - 5, hPoint - 5);
              ctx.lineTo(wPoint + wid / 2 + (wPoint + wid) * positions[j]
                - xspa + 5, hPoint - 5);
            }
            ctx.closePath();
            ctx.fillStyle = "#1a9300";
            ctx.fill();

            ctx.font = "16px Microsoft YaHei";
            ctx.textAlign = "center";
            ctx.fillStyle = "#353131";
            if (i > positions[j]) {

              ctx.fillText(relations[j], wPoint + wid / 2
                + (wPoint + wid)
                * (positions[j] * 1 + (i - positions[j]) / 2),
                hPoint - Math.abs(i - positions[j]) * yspa + 21);
            } else {
              ctx.fillText(relations[j], wPoint + wid / 2
                + (wPoint + wid) * (i + (positions[j] - i) / 2),
                hPoint - Math.abs(i - positions[j]) * yspa + 21);
            }

          }

        }

      })
    },
    methods: {},
    created() {
    },
    updated() {
    }
  }
</script>

<style scoped>

</style>
