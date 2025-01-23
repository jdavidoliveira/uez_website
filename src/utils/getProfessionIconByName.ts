export function getProfessionIconByName(professionName: string, azulao?: boolean) {
  return `/images/icons/categorias/${professionName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(" ", "")}${azulao ? "-azulao" : ""}.png`
}
