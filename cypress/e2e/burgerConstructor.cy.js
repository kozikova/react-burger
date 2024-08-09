const GROUP_SELECTOR = "[data-test^=ingredient-group]";
const DRAG_SELECTOR = "[data-test^=ingredient-drag]";
const DROP_SELECTOR = "[data-test=bun-drop]";
const MODAL_SELECTOR = "[data-test^=modal]";
const CLOSE_SELECTOR = "[data-test^=close]";
const OVERLAY_SELECTOR = "[data-test^=overlay]";
const MODAL_TITLE = "Детали ингредиента";

describe("Burger Constructor", () => {
  beforeEach(() => {
    cy.visit("");
    cy.contains("Соберите бургер");
  });

  it("DragNDrop bun and two different ingredients", () => {
    cy.contains("Выберите булку");
    cy.contains("Выберите начинку");

    cy.get(GROUP_SELECTOR)
      .eq(0)
      .find(DRAG_SELECTOR)
      .first()
      .contains("Краторная булка N-200i")
      .trigger("dragstart");

    cy.get(DROP_SELECTOR).trigger("drop");

    cy.get(GROUP_SELECTOR).eq(1).find(DRAG_SELECTOR).first().trigger("dragstart");
    cy.get(DROP_SELECTOR).first().trigger("drop");
    cy.get(GROUP_SELECTOR).eq(2).find(DRAG_SELECTOR).first().trigger("dragstart");
    cy.get(DROP_SELECTOR).trigger("drop");
  });

  it("open close ingredientDetails", () => {
    cy.get(GROUP_SELECTOR).eq(0).find(DRAG_SELECTOR).first().click();
    cy.get(MODAL_SELECTOR).should("be.visible").contains(MODAL_TITLE);

    cy.get(CLOSE_SELECTOR).click();
    cy.get(MODAL_SELECTOR).should("not.exist");

    cy.get(GROUP_SELECTOR).eq(0).find(DRAG_SELECTOR).first().click();
    cy.get(MODAL_SELECTOR).should("be.visible").contains(MODAL_TITLE);

    cy.get(OVERLAY_SELECTOR).click({ force: true });
    cy.get(MODAL_SELECTOR).should("not.exist");
  });
});
