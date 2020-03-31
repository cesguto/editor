import UIElement, { EVENT } from "../../../util/UIElement";

import { DEBOUNCE, PREVENT, WHEEL, ALT, THROTTLE, IF, KEYUP, CONTROL, KEY, DRAGOVER, DROP, KEYPRESS, KEYDOWN } from "../../../util/Event";

import ElementView from "./ElementView";
import NumberRangeEditor from "../property-editor/NumberRangeEditor";
import { Length } from "../../../editor/unit/Length";
import Dom from "../../../util/Dom";
import PageTools from "../view-items/PageTools";
import PageSubEditor from "../view-items/PageSubEditor";
import RotateEditorView from "../view-items/RotateEditorView";

export default class CanvasView extends UIElement {

  components() {
    return {
      PageTools,
      NumberRangeEditor,
      ElementView,
      PageSubEditor,
      RotateEditorView
    }
  }

  afterRender() {

    this.emit('loadJSON');
  }
  template() {
    return/*html*/`
      <div class='page-container' tabIndex="-1">
        <div class='page-view'>
          <div class='page-lock scrollbar' ref='$lock'>
            <ElementView ref='$elementView' />
          </div>
        </div>
        <PageSubEditor />
        <PageTools />
        <RotateEditorView />
      </div>
    `;
  }

  [EVENT('toggle.fullscreen')] () {
    Dom.body().fullscreen();
  }

  [WHEEL('$lock') + ALT + PREVENT + THROTTLE(10)] (e) {

    var dt = e.deltaY < 0 ? 1.1 : 0.9;
    this.emit('changeScaleValue', this.$editor.scale * dt);
  }

  getScrollTop() {
    if (this.refs.$lock) {
      return this.refs.$lock.scrollTop()
    }

    return 0;
  }

  getScrollLeft() {
    if (this.refs.$lock) {
      return this.refs.$lock.scrollLeft()
    }
    
    return 0; 
  }  

  get scrollXY () {
    return {
      screenX: Length.px(this.getScrollLeft()),
      screenY: Length.px(this.getScrollTop())
    }
  }

  get screenSize () {
    if (this.refs.$lock) {
      return this.refs.$lock.rect()
    }

    return {
      width: 0,
      height: 0
    }
  } 

  setScrollTop (value) {
    this.refs.$lock.setScrollTop(value);
  }

  addScrollTop (value) {
    this.setScrollTop(this.getScrollTop() + value)
  }

  setScrollLeft (value) {
    this.refs.$lock.setScrollLeft(value);
  }  

  addScrollLeft (value) {
    this.setScrollLeft(this.getScrollLeft() + value)
  }

  [EVENT('focusCanvasView')] () {
    this.$el.focus()
  }

  // [EVENT('loadSketchData')] (sketchData) {
  //   var projects = SketchUtil.parse (sketchData);

  //   projects.forEach(p => {
  //     editor.add(p);
  //   })

  //   this.refresh();
  //   this.emit('addElement');    
  //   this.emit('refreshCanvas')
  //   this.emit('refreshStyleView')

  // }

}
