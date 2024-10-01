import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

// örnek item
const item = {
  name: "Salted caramel",
  imagePath: "/images/scoops/salted-caramel.png",
  id: "ecec",
};
// Bir bileşen prop alıyorsa test ortamında da prop almalı.
test("Gelen propa göre miktar, başlık ve fotoğraf ekrana basılır", () => {
  render(<Card item={item} amount={3} addToBasket={() => {}} removeFromBasket={() => {}} />);

  // Miktar spanını çağır
  const amount = screen.getByTestId("amount");
  // Miktar yazısı 3e eşit mi kontrolü yap
  expect(amount.textContent).toBe("3");
  // getBy("Salted caramel") ile eğer elemanti bulamazsa hata fırlatır.
  // getByText kullanırsak expect kullanmaya gerek kalmaz.
  screen.getByText("Salted caramel");
  // Resim elementini çağır
  const image = screen.getByAltText("çeşit-resim");
  // Resim kaynağını kontrol et.
  expect(image).toHaveAttribute("src", "/images/scoops/salted-caramel.png");
});

test("Ekle ve azalt butonların tıklanınca fonksiyonlar doğru parametreler ile çalışır. ", async () => {
  const user = userEvent.setup();
  // Prop olarak gönderilen fonksiyonu test ediceksek jest aracılığı ile (mock) edilebilir.
  const addMockFn = jest.fn();
  const removeMockFn = jest.fn();

  render(<Card item={item} amount={5} addToBasket={addMockFn} removeFromBasket={removeMockFn} />);

  // Ekle ve Azalt butonlarını al
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const delBtn = screen.getByRole("button", { name: /azalt/i });
  // Ekle butonuna tıkla
  await user.click(addBtn);
  expect(addMockFn).toHaveBeenCalledWith(item);
  // Azalt butonuna tıkla
  await user.click(delBtn);
  // removeFromBasket fonksiyonu doğru parametrelerle çalışıyor mu
  expect(removeMockFn).toHaveBeenCalledWith(item.id);
});

describe("azalt butonu aktiflik testleri", () => {
  it("Miktar>1 ise button aktiftir", () => {
    render(<Card item={item} amount={3} />);
    const button = screen.getByRole("button", { name: "Azalt" });
    expect(button).toBeEnabled();
  });

  it("Miktar=0 ise button inaktiftir", () => {
    render(<Card item={item} amount={0} />);
    const button = screen.getByRole("button", { name: "Azalt" });
    expect(button).toBeDisabled();
  });
});
