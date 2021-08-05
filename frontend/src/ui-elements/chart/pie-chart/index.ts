import UIElement from '../../../core/ui-element';
import { calcDegreeWithLines, toRadian } from '../../../utils/math';
import { $ } from '../../../utils/selector';
import { sleep } from '../../../utils/time';

export type PieChartInputData = {
  value: number;
  name: string;
  color: string;
  label: string;
}

type ChartData = {
  value: number;
  name: string;
  color: string;
  degree: number;
  label: string;
}

const TITLE_FONT = '16px Arial';
const SUB_TITLE_FONT = '14px Arial';

class PieChartUIElement extends UIElement {
  private chartData: ChartData[];
  private width: number;
  private height: number;
  private centerX: number;
  private centerY: number;
  private radius: number;
  private $canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;

  constructor ($target: HTMLElement, chartInputData: PieChartInputData[], width: number, height: number) {
    super($target, {
      className: 'pie-chart-wrapper'
    });

    this.width = width;
    this.height = height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.radius = this.width * 0.25;
    this.chartData = this.formatChartData(chartInputData);
  }

  protected render (): void {
    this.$element.innerHTML = `
        <canvas class="pie-chart" width="${this.width}" height="${this.height}"></canvas>
    `;
  }

  protected addListener (): void {
    this.$canvas?.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  protected mount (): void {
    const $canvas = $('.pie-chart') as HTMLCanvasElement;
    if ($canvas === null) {
      return;
    }

    this.$canvas = $canvas;
    this.ctx = $canvas.getContext('2d') ?? undefined;

    this.drawWithAnimation(0);
  }

  emphasize (index: number): void {
    this.ctx?.clearRect(0, 0, this.width, this.height);
    let currentDegree = 0;
    for (let i = 0; i < index; i += 1) {
      currentDegree += this.chartData[i].degree;
    }

    const focusDegree = (currentDegree + (currentDegree + this.chartData[index].degree)) / 2;

    this.draw(360, focusDegree);
  }

  cancelEmphasize (): void {
    this.ctx?.clearRect(0, 0, this.width, this.height);
    this.draw(360);
  }

  private formatChartData (data: PieChartInputData[]) {
    const total = data.reduce((sum, curr) => sum + curr.value, 0);

    return data.map(item => {
      return {
        name: item.name,
        value: item.value,
        degree: 360 * (item.value / total),
        color: item.color,
        label: item.label
      };
    });
  }

  private async drawWithAnimation (endDegree: number): Promise<void> {
    if (endDegree <= 360) {
      this.ctx?.clearRect(0, 0, this.width, this.height);
      this.draw(endDegree);
      await sleep(1);

      requestAnimationFrame(() => {
        this.drawWithAnimation(endDegree + 10);
      });
    }
  }

  private draw (limitDegree: number, focusDegree?: number) {
    let currentDegree = 0;

    const { ctx, centerX, centerY, radius } = this;
    if (ctx === undefined) {
      return;
    }

    for (const data of this.chartData) {
      const isInFocus = focusDegree && currentDegree < focusDegree && focusDegree < currentDegree + data.degree;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      const isLimited = currentDegree + data.degree >= limitDegree;
      const arcRadius = isInFocus ? radius * 1.1 : radius;

      if (isLimited) {
        ctx?.arc(centerX, centerY, arcRadius, toRadian(currentDegree), toRadian(limitDegree), false);
      } else {
        ctx?.arc(centerX, centerY, arcRadius, toRadian(currentDegree), toRadian(currentDegree + data.degree), false);
      }
      currentDegree += data.degree;

      ctx.closePath();
      ctx.fillStyle = data.color;
      ctx.strokeStyle = '#ffffff';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 0;
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      if (isInFocus) {
        const middleDegreeOfPie = currentDegree - (data.degree / 2);
        const x = Math.cos(toRadian(middleDegreeOfPie)) * radius;
        let y = Math.sqrt(Math.pow(radius, 2) - Math.pow(x, 2));
        if (middleDegreeOfPie < 180) {
          y *= -1;
        }

        const measureTextWidth = ctx.measureText(data.name).width > ctx.measureText(data.value.toString()).width ? ctx.measureText(data.name).width : ctx.measureText(data.value.toString()).width;

        const PADDING_VALUE = 30;
        const TEXT_PADDING_VALUE = PADDING_VALUE + 5;

        const lineIncreaseX = x === 0 ? 0 : x < 0 ? -PADDING_VALUE : PADDING_VALUE;
        const lineIncreaseY = y === 0 ? 0 : y < 0 ? PADDING_VALUE : -PADDING_VALUE;
        const textIncreaseX = x === 0 ? 0 : x < 0 ? -(TEXT_PADDING_VALUE + measureTextWidth) : (TEXT_PADDING_VALUE);
        const textIncreaseY = y === 0 ? 0 : y < 0 ? TEXT_PADDING_VALUE : -TEXT_PADDING_VALUE;

        ctx.beginPath();
        ctx.font = TITLE_FONT;
        ctx.moveTo(centerX + x, centerY - y);
        ctx.lineTo(centerX + x + lineIncreaseX, centerY - y + lineIncreaseY);
        ctx.strokeStyle = data.color;
        ctx.stroke();
        ctx.fillText(data.name, centerX + x + textIncreaseX, centerY - y + textIncreaseY);

        ctx.font = SUB_TITLE_FONT;
        ctx.fillText(data.label, centerX + x + textIncreaseX, centerY - y + textIncreaseY + 15);
        ctx.closePath();
      }
      if (isLimited) {
        return;
      }
    }
  }

  private onMouseMove (e: MouseEvent): void {
    const { ctx, centerX, centerY, width, height, radius } = this;
    const absMousePos = this.getMousePos(e);

    const x = absMousePos.x - centerX;
    const y = -(absMousePos.y - centerY);

    ctx?.clearRect(0, 0, width, height);
    if (Math.abs(x) > radius || Math.abs(y) > radius) {
      this.draw(360);
      return;
    }

    const degree = calcDegreeWithLines(x, y);
    this.draw(360, degree);
  }

  private getMousePos (e: MouseEvent) {
    if (this.$canvas === undefined) {
      return {
        x: 0,
        y: 0
      };
    }

    const rect = this.$canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}

export default PieChartUIElement;
