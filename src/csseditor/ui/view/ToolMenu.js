import UIElement, { EVENT } from "../../../util/UIElement";
import menuItems from "../menu-items/index";
import { CLICK } from "../../../util/Event";

export default class ToolMenu extends UIElement {
  components() {
    return menuItems;
  }

  template() {
    return /*html*/`
      <div class='tool-menu center'>
        <div class='items'>
          <div class='draw-items' ref='$items'>
            <SelectTool />
            <AddRect />
            <AddCircle />         
            <AddText />
            <AddImage />
            <AddVideo />
            <div class='divider'></div>
            <AddDrawPath />
            <AddPath />
            <AddSVGRect />
            <AddSVGCircle />            
            <AddSVGText />
            <AddSVGTextPath />
            <AddPolygon />
          </div>
        </div>

      </div>
    `;
  }

  [EVENT('noneSelectMenu')] () {
    var $selected = this.refs.$items.$('.selected');
    if ($selected) {
      $selected.removeClass('selected');
    }
  }

  [CLICK('$items button')] (e) {
    e.$dt.onlyOneClass('selected');
  }
}
