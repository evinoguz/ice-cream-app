import { render, screen } from "@testing-library/react";
import Toppings from "./index";
import userEvent from "@testing-library/user-event";

it("Sosları ekleme ve çıkarma işleminin toplam fiyata etkisi", async () => {
  const user = userEvent.setup();

  //1) Toppings bileşenini renderla
  render(<Toppings />);

  //2) Tüm sosların Checbox'larını al
  const toppings = await screen.findAllByRole("checkbox");

  //3) Toplam spanını al
  const total = screen.getByTestId("total");

  //4) Tüm Checkbox'ları işaretleme
  toppings.forEach((i) => expect(i).not.toBeChecked());

  //5) Toplam ücret 0 (sıfır) mı
  expect(total.textContent).toBe("0");

  //6) Soslardan birini işaretle
  await user.click(toppings[4]);

  //7) Toplam ücret 3 mü
  expect(total.textContent).toBe("3");

  //8) Farklı bir sos işaretle
  await user.click(toppings[0]);

  //9) toplam ücret 6 mı
  expect(total.textContent).toBe("6");

  //10) Soslardan birinin işaretini kaldır
  await user.click(toppings[0]);

  //11) Toplam ücret 3 mü
  expect(total.textContent).toBe("3");

  //12) Soslardan birinin işaretini kaldır
  await user.click(toppings[4]);

  //13) Toplam ücret 0 (sıfır) mı
  expect(total.textContent).toBe("0");
});
