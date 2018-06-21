import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { Constants } from './../constants';
import {
  Column,
  Editor,
  EditorValidator,
  EditorValidatorOutput,
  HtmlElementPosition,
  KeyCode
} from './../models/index';
import * as $ from 'jquery';

/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
@inject(I18N)
export class LongTextEditor implements Editor {
  $input: any;
  $wrapper: any;
  defaultValue: any;

  constructor(private i18n: I18N, private args: any) {
    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
  }

  /** Get Column Editor object */
  get columnEditor(): any {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    const cancelText = this.i18n.tr('CANCEL') || Constants.TEXT_CANCEL;
    const saveText = this.i18n.tr('SAVE') || Constants.TEXT_SAVE;
    const $container = $('body');

    this.$wrapper = $(`<div class="slick-large-editor-text" />`).appendTo($container);
    this.$input = $(`<textarea hidefocus rows="5">`).appendTo(this.$wrapper);

    $(`<div class="editor-footer">
        <button class="btn btn-primary btn-xs">${saveText}</button>
        <button class="btn btn-default btn-xs">${cancelText}</button>
      </div>`).appendTo(this.$wrapper);

    this.$wrapper.find('button:first').on('click', (event: Event) => this.save());
    this.$wrapper.find('button:last').on('click', (event: Event) => this.cancel());
    this.$input.on('keydown', this.handleKeyDown);

    this.position(this.args.position);
    this.$input.focus().select();
  }

  handleKeyDown(e: any) {
    if (e.which === KeyCode.ENTER && e.ctrlKey) {
      this.save();
    } else if (e.which === KeyCode.ESCAPE) {
      e.preventDefault();
      this.cancel();
    } else if (e.which === KeyCode.TAB && e.shiftKey) {
      e.preventDefault();
      this.args.grid.navigatePrev();
    } else if (e.which === KeyCode.TAB) {
      e.preventDefault();
      this.args.grid.navigateNext();
    }
  }

  save() {
    this.args.commitChanges();
  }

  cancel() {
    this.$input.val(this.defaultValue);
    this.args.cancelChanges();
  }

  hide() {
    this.$wrapper.hide();
  }

  show() {
    this.$wrapper.show();
  }

  position(position: HtmlElementPosition) {
    this.$wrapper
      .css('top', (position.top || 0) - 5)
      .css('left', (position.left || 0) - 5);
  }

  destroy() {
    this.$wrapper.remove();
  }

  focus() {
    this.$input.focus();
  }

  loadValue(item: any) {
    this.$input.val(this.defaultValue = item[this.columnDef.field]);
    this.$input.select();
  }

  serializeValue() {
    return this.$input.val();
  }

  applyValue(item: any, state: any) {
    item[this.columnDef.field] = state;
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultValue == null)) && (this.$input.val() !== this.defaultValue);
  }

  validate(): EditorValidatorOutput {
    if (this.validator) {
      const validationResults = this.validator(this.$input.val());
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    // by default the editor is always valid
    // if user want it to be a required checkbox, he would have to provide his own validator
    return {
      valid: true,
      msg: null
    };
  }
}
