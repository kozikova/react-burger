const BASE_URL = "http://localhost:3000";

describe("Burger Constructor", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.contains("Соберите бургер");
  });

  it("DragNDrop bun and two different ingredients", () => {
    cy.contains("Выберите булку");
    cy.contains("Выберите начинку");

    cy.get("[data-test^=ingredient-group]")
      .eq(0)
      .find("[data-test^=ingredient-drag]")
      .first()
      .contains("Краторная булка N-200i")
      .trigger("dragstart");

    cy.get('[data-test="bun-drop"]').trigger("drop");

    cy.get("[data-test^=ingredient-group]")
      .eq(1)
      .find("[data-test^=ingredient-drag]")
      .first()
      .trigger("dragstart");
    cy.get('[data-test="bun-drop"]').first().trigger("drop");
    cy.get("[data-test^=ingredient-group]")
      .eq(2)
      .find("[data-test^=ingredient-drag]")
      .first()
      .trigger("dragstart");
    cy.get('[data-test="bun-drop"]').trigger("drop");
  });

  it("open close ingredientDetails", () => {
    cy.get("[data-test^=ingredient-group]")
      .eq(0)
      .find("[data-test^=ingredient-drag]")
      .first()
      .click();
    cy.get("[data-test^=modal]").should("be.visible").contains("Детали ингредиента");

    cy.get("[data-test^=close]").click();
    cy.get("[data-test^=modal]").should("not.exist");

    cy.get("[data-test^=ingredient-group]")
      .eq(0)
      .find("[data-test^=ingredient-drag]")
      .first()
      .click();
    cy.get("[data-test^=modal]").should("be.visible").contains("Детали ингредиента");

    cy.get("[data-test^=overlay]").click({ force: true });
    cy.get("[data-test^=modal]").should("not.exist");
  });
});
