import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Scoops from "./index";

it("API'dan alınan veriler için ekrana kartlar basılması", async () => {
  // Scoops bileşenini render et
  render(<Scoops />);
  // Ekrana basılan cartları al
  const images = await screen.findAllByAltText("çeşit-resim");
  // Birden fazla kart var mı
  expect(images.length).toBeGreaterThanOrEqual(1);
});

it("Çeşitlerin ekleme ve azaltma özelliklerinin toplam fiyata etkisi", async () => {
  const user = userEvent.setup();
  // Scoops bileşenini render et
  render(<Scoops />);
  // Tüm Ekle ve Azalt butonlarını çağır
  const addBtns = await screen.findAllByRole("button", { name: "Ekle" });
  const delBtns = await screen.findAllByRole("button", { name: "Azalt" });
  // Toplam fiyat elementini çağır
  const total = screen.getByTestId("total");
  // Toplam fiyat 0 (sıfır) mı
  expect(total.textContent).toBe("0");
  // Chocolate'ın Ekle butonuna tıkla
  await user.click(addBtns[2]);

  // Toplam fiyat 20 mi
  expect(total.textContent).toBe("20");

  // Vanilla'nın Ekle butonuna iki kez tıkla
  await user.dblClick(addBtns[1]);

  // Toplam fiyat 60 mı
  expect(total.textContent).toBe("60");

  // Vanilla'nın Azalt butonuna tıkla
  await user.click(delBtns[1]);

  // Toplam fiyat 40 mı
  expect(total.textContent).toBe("40");

  // Vanilla'nın Azalt butonuna tıkla
  await user.click(delBtns[1]);

  // Toplam fiyat 20 mı
  expect(total.textContent).toBe("20");

  // Chocolate'ın azalt butonuna tıkla
  await user.click(delBtns[2]);

  // Toplam fiyat 0 (sıfır) mı
  expect(total.textContent).toBe("0");
});
