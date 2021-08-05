import View from '../../core/view';
import { totalCash } from '../../types/cash-history';
import { formatNumber } from '../../utils/formatter';
import { $ } from '../../utils/selector';
import { getSVGElement } from '../../utils/svg';
import CategoryExpenditureViewModel from '../../view-models/category-expenditure';

import './index.css';

class CategoryExpenditureView extends View {
  private categoryExpenditureViewModel: CategoryExpenditureViewModel;
  private SVG_HEIGHT = 784;
  private SVG_WIDTH = 287;
  private SVG_LINE_STYLE = 'transform: scaleX(0.87) translateX(90px) scaleY(0.87) translateY(34px)';

  constructor ($target: HTMLElement) {
    super($target);
    this.categoryExpenditureViewModel = new CategoryExpenditureViewModel(this);
  }

  getChartBaseLineDOMs (): SVGElement[] {
    const $container = $('.content__curved-chart');
    if ($container === null) {
      return [];
    }
    const BASELINE_AMOUNT = 5;
    const baselineInterval = this.SVG_WIDTH / (BASELINE_AMOUNT - 1);

    const $DOM = new Array(BASELINE_AMOUNT)
      .fill(0)
      .map((_, idx) => this.getBaseLineDOM(baselineInterval * idx));

    return $DOM;
  }

  getBaseLineDOM (pos: number): SVGElement {
    const $baseline = getSVGElement('line', {
      x1: '0',
      y1: `${pos}`,
      x2: `${this.SVG_HEIGHT}`,
      y2: `${pos}`,
      stroke: 'var(--title-active)',
      'stroke-opacity': '.2',
      style: this.SVG_LINE_STYLE
    });
    return $baseline;
  }

  getCoordinates (data: number[]): number[][] {
    const $container = $('.content__curved-chart');
    if ($container === null) {
      return [];
    }
    const maxMonth = 12;
    const intervalX = this.SVG_HEIGHT / (maxMonth - 1);
    const max = Math.max(...data);
    return data.reduce((acc, curr, idx) => [
      ...acc,
      [
        idx * intervalX,
        this.SVG_WIDTH - (curr / max) * this.SVG_WIDTH
      ]
    ], [] as number[][]);
  }

  getPathLAttribute (data: number[]): string {
    const coords = this.getCoordinates(data);
    console.log(coords);

    const drawn = coords.reduce((acc, curr, idx) => {
      const isFirstPoint = idx === 0;
      if (isFirstPoint) {
        return `M ${curr[0]},${curr[1]}`;
      }
      return `${acc} L ${curr[0]} ${curr[1]}`;
    }, '');

    return drawn;
  }

  getCurvedLine (prices: number[]): SVGElement {
    const $curvedLine = getSVGElement('path', {
      fill: 'none',
      stroke: 'url(#curvedLineGradient)',
      'stroke-width': '3',
      style: this.SVG_LINE_STYLE,
      d: this.getPathLAttribute(prices)
    }) as SVGPathElement;
    $curvedLine.setAttribute('stroke-dasharray', `${$curvedLine.getTotalLength()}`);

    const $animate = getSVGElement('animate', {
      attributeName: 'stroke-dashoffset',
      from: `${$curvedLine.getTotalLength()}`,
      to: '0',
      dur: '1.5'
    });
    $curvedLine.appendChild($animate);

    return $curvedLine;
  }

  drawXLabels (totalCashes: totalCash[]): void {
    const $monthDelimiter = $('.category-expenditure__x-labels-container');
    if ($monthDelimiter !== null) {
      const xLabels = totalCashes
        .map(totalCash => `<div>${totalCash.month}월</div>`)
        .join('');

      $monthDelimiter.innerHTML = xLabels;
    }
  }

  drawYLabels (totalCashes: totalCash[]): void {
    const $expenseDelimiter = $('.category-expenditure__y-labels-container');
    if ($expenseDelimiter !== null) {
      const max = totalCashes
        .reduce((acc, curr) => Math.max(acc, curr.price), 0);
      const min = totalCashes
        .reduce((acc, curr) => Math.min(acc, curr.price), max);

      const yLabels = new Array(5).fill(0)
        .map((_, i) => `<div>${formatNumber(min + (max / 4) * i)} ₩</div>`)
        .reverse()
        .join('');

      $expenseDelimiter.innerHTML = yLabels;
    }
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    this.$target.innerHTML = `
    <div class='category-expenditure__container'>
      <div class='category-expenditure__y-labels-container'>
      </div>
      <svg class='content__curved-chart' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${this.SVG_HEIGHT} ${this.SVG_WIDTH}'>
        <defs>
        <linearGradient id="curvedLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="var(--primary2)"/>
          <stop offset="100%" stop-color="var(--primary3)"/>
        </linearGradient>
        </defs>
      </svg>
      <div class='category-expenditure__x-labels-container'>
      </div>
    </div>
  `;
  }

  protected mount (): void {
    const { totalCashes } = this.categoryExpenditureViewModel;
    if (totalCashes === undefined) {
      return;
    }
    const prices = totalCashes.map(totalCash => totalCash.price);
    if (prices === undefined) {
      return;
    }
    const $curvedChart = $('.content__curved-chart');
    if ($curvedChart === null) {
      return;
    }

    this.getChartBaseLineDOMs().forEach($baseLine => $curvedChart.appendChild($baseLine));

    const $curvedLine = this.getCurvedLine(prices);
    $curvedChart.appendChild($curvedLine);

    this.drawYLabels(totalCashes);
    this.drawXLabels(totalCashes);
  }
}

export default CategoryExpenditureView;
