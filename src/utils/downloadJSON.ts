import { Soda } from "@/types/soda";
import { fileURLToPath } from "url";

// Add the downloadJSON function
const downloadJSON = (props: any) => {
  const { updateSodaQuantity: purchasedSoda } = props;
  const filename = purchasedSoda.name + ".json";
  const json = JSON.stringify(purchasedSoda, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadJSON;
