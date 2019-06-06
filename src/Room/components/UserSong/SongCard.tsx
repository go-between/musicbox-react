import React, { useImperativeHandle, useRef } from 'react'
import system from '@rebass/components'
import { Button, Flex, Text } from 'rebass'
import { X } from 'react-feather'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd'
import { XYCoord } from 'dnd-core'

import { DRAG_TYPE } from './redux/types'

const SongCardItem = system(
  {
    alignItems: 'center',
    borderRadius: 4,
    bg: 'white',
    boxShadow: 2,
    display: 'flex',
    justifyContent: 'space-between',
    mb: 3,
    px: 3,
    py: 2,
  },
  {
    cursor: 'move',
  },
  'alignItems',
  'borderRadius',
  'boxShadow',
  'color',
  'display',
  'flex',
  'justifyContent',
  'space',
)

export interface ICardProps {
  id: any
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void

  isDragging: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  removeSong: () => void
}

interface ICardInstance {
  getNode(): HTMLDivElement | null
}

const SongCard: React.RefForwardingComponent<
  HTMLDivElement,
  ICardProps
> = React.forwardRef(
  ({ isDragging, connectDragSource, connectDropTarget, children, removeSong }, ref) => {
    const elementRef = useRef(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)

    const opacity = isDragging ? 0 : 1
    useImperativeHandle<{}, ICardInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }))
    return (
      <SongCardItem
        as="div"
        ref={elementRef}
        style={{ opacity }}
      >
        {children}
        <Button
          bg="offWhite"
          display="flex"
          p={1}
          onClick={removeSong}
        >
          <X color="#000" size={16} />
        </Button>
      </SongCardItem>
    )
  },
)

export default DropTarget(
  DRAG_TYPE,
  {
    hover(
      props: ICardProps,
      monitor: DropTargetMonitor,
      component: ICardInstance,
    ) {
      if (!component) {
        return null
      }
      // node = HTML Div element from imperative API
      const node = component.getNode()
      if (!node) {
        return null
      }

      const dragIndex = monitor.getItem().index
      const hoverIndex = props.index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return null
      }

      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return null
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return null
      }

      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
      return null
    },
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    DRAG_TYPE,
    {
      beginDrag: (props: ICardProps) => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(SongCard),
)
