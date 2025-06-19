// src/components/shared/kanban/UseDragDrop.js
import { useDrop } from 'react-dnd';

/**
 * Full-scale reusable drag-and-drop hook for Kanban and other modules.
 * Supports validation, stage locking, visual hover feedback, and callbacks.
 */
export default function UseDragDrop({
  stage,
  onStageChange,
  onHover = () => {},
  allowDrop = () => true,
  onDropComplete = () => {}
}) {
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: 'kanban-card',
      canDrop: (item) => allowDrop(item, stage),
      drop: (item, monitor) => {
        if (!monitor.didDrop() && item.stage !== stage.value) {
          onStageChange(item, stage.value);
          onDropComplete(item, stage);
        }
      },
      hover: (item, monitor) => {
        if (monitor.isOver({ shallow: true })) {
          onHover(item, stage);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [stage, onStageChange, allowDrop, onHover, onDropComplete]
  );

  return { dropRef, isOver, canDrop };
}
