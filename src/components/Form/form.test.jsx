import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

test("Koşulların onaylanma durumuna göre button aktifliği", () => {
  // Test edilecek bileşeni render et
  render(<Form />);
  // Elementleri çağır
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  // Checkbox işaretleme
  expect(checkbox).not.toBeChecked();
  // Button pasif mi
  expect(button).toBeDisabled();
  // Checkbox işaretle
  fireEvent.click(checkbox);
  // Button aktif mi
  expect(button).toBeEnabled();
  // Checkbox işaretleme
  fireEvent.click(checkbox);
  // Button pasif mi
  expect(button).toBeDisabled();
});

test("Butonun hover durumuna göre bildirim göster/gizle", () => {
  // Formu render et
  render(<Form />);
  // Elementleri al
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const alert = screen.getByText(/size gerçekten/i);
  // Bildirimi gizle
  expect(alert).not.toBeVisible();
  // Checkbox işaretle
  fireEvent.click(checkbox);
  // Mouse'u butonun üzerine getir
  fireEvent.mouseEnter(button);
  // Bildirimi göster
  expect(alert).toBeVisible();
  // Mouse'ı butondan çek
  fireEvent.mouseLeave(button);
  // Bildirimi gizle
  expect(alert).not.toBeVisible();
});
