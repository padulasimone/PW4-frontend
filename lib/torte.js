import mysql from "mysql2/promise";

import xss from "xss";
import fs from "node:fs";

export async function getTorte() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Magazzino@@11",
    database: "pasticceria",
  });
  const [rows] = await connection.query("SELECT * FROM prodotto");
  await connection.end();

  return rows;
}

export async function saveTorta(torta) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Magazzino@@11",
    database: "pasticceria",
  });

  torta.descrizione = xss(torta.descrizione);
  torta.ingredienti = xss(torta.ingredienti);

 
  const extension = torta.foto.name.split(".").pop();
  const filename =
    torta.nome.toLowerCase().replace(/\s+/g, "-") + "." + extension;

  const stream = fs.createWriteStream("public/immaginiTorte/" + filename);
  const bufferedImage = await torta.foto.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Errore durante il salvataggio dell'immagine");
    }
  });

  torta.foto = "/immaginiTorte/" + filename;

  await connection.query(
    "INSERT INTO prodotto (nome, descrizione, ingredienti, quantita, prezzo, foto) VALUES (?, ?, ?, ?, ?, ?)",
    [
      torta.nome,
      torta.descrizione,
      torta.ingredienti,
      torta.quantita,
      torta.prezzo,
      torta.foto,
    ]
  );
  await connection.end();
}
