import { validateForm } from "../utils/validateForm";
import { expect, test } from 'vitest'

test("validate", () => {
  expect(validateForm("test", "8999999999")).toBe(false);
  expect(validateForm("test@test.test", "8999999999")).toBe(false);
  expect(validateForm("test", "+7(999)-999-99-99")).toBe(false);
  expect(validateForm(null, undefined)).toBe(false);
  expect(validateForm("test@test.test", "+7(999)-999-99-99")).toBe(true);
});
