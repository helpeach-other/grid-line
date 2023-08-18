import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import * as SC from './styles';

const App = () => {
  const gridWrapperRef = useRef<HTMLDivElement | null>(null);
  const rect = useRef<DOMRect | null>(null);
  // 获取容器元素的位置信息
  useEffect(() => {
    const wrapperEl = gridWrapperRef.current;
    if (!wrapperEl) return;
    rect.current = wrapperEl.getBoundingClientRect();
  }, []);

  // 记录鼠标经过的格子
  const [activeGridSet, setActiveGridSet] = useState(new Set<number>());
  const startDraw = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!rect.current) return;
    const { x, y } = rect.current;

    // 记录当次鼠标经过的格子
    const hash = new Set<number>();
    const mousemove = (e: MouseEvent) => {
      // 计算鼠标经过的格子
      const { clientX, clientY } = e;
      // 计算鼠标相对于容器的位置
      const x1 = clientX - x;
      const y1 = clientY - y;
      // 排除鼠标超出容器的情况
      if (x1 < 0 || y1 < 0 || x1 > SC.GRID_SIZE * 10 || y1 > SC.GRID_SIZE * 10) return;
      // 计算当前鼠标所在行
      const row = Math.floor(y1 / SC.GRID_SIZE);
      // 计算当前鼠标所在列
      const col = Math.floor(x1 / SC.GRID_SIZE);
      // 计算当前鼠标所在的格子
      const index = col + row * 10;
      hash.add(index);
      // 更新选中的格子
      setActiveGridSet(new Set(hash));
    };
    // 鼠标抬起时取消全局事件
    const mouseup = () => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };
    // 注册全局事件
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };

  return (
    <SC.Container>
      {/* 从 onMouseDown 触发时开始绘制 */}
      <SC.GridWrapper ref={gridWrapperRef} onMouseDown={startDraw}>
        {Array(100)
          .fill(0)
          .map((_, i) => (
            // 选中状态
            <SC.GridItem key={i} active={activeGridSet.has(i)} />
          ))}
      </SC.GridWrapper>
    </SC.Container>
  );
};

export default App;
