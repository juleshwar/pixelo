class ActionStack {
  /**
   * @param stack contains the actions done until a point of time
   * @param actionPointer has the index of which action was done last. This param will make more sense while undoing and redoing
   * @function pushToStack pushes an action to the stack. If a bunch of actions are *undone* and then a new action is committed,
   *  all the actions after the @param actionPointer are cleared and the new action is pushed to the stack
   * @function undo will return the item at the index @param actionPointer is holding and it will move the @param actionPointer to the
   *  left by one index
   * @function redo will move the @param actionPointer to the right by one index and return the item at that index
   *
   * actionItem format
   * {
   *    type: 1, // 1 representing the drawing panel (2 will be added for the PaletteBar)
   *    from: #000,
   *    to: #fff,
   *    cellIndex?: 10 // only applicable for type 1
   * }
   */

  constructor() {
    this.stack = [];
    this.actionPointer = -1;
  }

  stack = [];
  actionPointer = -1;

  get isUndoPossible() {
    return this.actionPointer > -1;
  }
  get isRedoPossible() {
    return this.actionPointer < this.stack.length - 1;
  }

  pushToStack(actionItem) {
    /* Check the comment on the top of the file to understand this logic */
    this.stack.length = this.actionPointer + 1;
    this.stack.push(actionItem);
    this.actionPointer = this.stack.length - 1;
  }

  undo() {
    if (this.isUndoPossible) {
      const actionItem = this.stack[this.actionPointer];
      this.actionPointer--;

      return actionItem;
    }
  }

  redo() {
    if (this.isRedoPossible) {
      this.actionPointer++;

      const actionItem = this.stack[this.actionPointer];
      return actionItem;
    }
  }
}

/* Singleton class coz we're gonna maintain only one stack */
export default new ActionStack();
