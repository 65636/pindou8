export type BeadColor = { code: string; hex: string };
export type BeadPalette = { id: string; label: string; diameter: number; colors: BeadColor[] };

export const PALETTES: Record<string, BeadPalette> = {
  "artkal": {
    "id": "artkal",
    "label": "Artkal",
    "diameter": 5,
    "colors": [
      {
        "code": "S01",
        "hex": "#FFFFFF"
      },
      {
        "code": "S02",
        "hex": "#FFA38B"
      },
      {
        "code": "S03",
        "hex": "#FF8200"
      },
      {
        "code": "S04",
        "hex": "#FA4616"
      },
      {
        "code": "S05",
        "hex": "#EE2737"
      },
      {
        "code": "S06",
        "hex": "#EF64A2"
      },
      {
        "code": "S07",
        "hex": "#97999B"
      },
      {
        "code": "S08",
        "hex": "#26D07C"
      },
      {
        "code": "S09",
        "hex": "#007371"
      },
      {
        "code": "S10",
        "hex": "#56B7E6"
      },
      {
        "code": "S11",
        "hex": "#0050B5"
      },
      {
        "code": "S12",
        "hex": "#9063CD"
      },
      {
        "code": "S13",
        "hex": "#000000"
      },
      {
        "code": "S14",
        "hex": "#FDDA24"
      },
      {
        "code": "S15",
        "hex": "#A72B2A"
      },
      {
        "code": "S16",
        "hex": "#674736"
      },
      {
        "code": "S17",
        "hex": "#7B4D35"
      },
      {
        "code": "S18",
        "hex": "#EAA794"
      },
      {
        "code": "S19",
        "hex": "#F8C1B8"
      },
      {
        "code": "S20",
        "hex": "#249E6B"
      },
      {
        "code": "S21",
        "hex": "#93C90E"
      },
      {
        "code": "S22",
        "hex": "#483698"
      },
      {
        "code": "S23",
        "hex": "#7D55C7"
      },
      {
        "code": "S24",
        "hex": "#1164C9"
      },
      {
        "code": "S25",
        "hex": "#EF60A3"
      },
      {
        "code": "S26",
        "hex": "#F04E98"
      },
      {
        "code": "S27",
        "hex": "#FFC72C"
      },
      {
        "code": "S28",
        "hex": "#EF95CF"
      },
      {
        "code": "S29",
        "hex": "#FBDB65"
      },
      {
        "code": "S30",
        "hex": "#A4E6E8"
      },
      {
        "code": "S31",
        "hex": "#B5E3D8"
      },
      {
        "code": "S32",
        "hex": "#FECB8B"
      },
      {
        "code": "S33",
        "hex": "#C5B4E3"
      },
      {
        "code": "S34",
        "hex": "#D50032"
      },
      {
        "code": "S35",
        "hex": "#F7CED7"
      },
      {
        "code": "S36",
        "hex": "#E06287"
      },
      {
        "code": "S37",
        "hex": "#8BD3E6"
      },
      {
        "code": "S38",
        "hex": "#BC204B"
      },
      {
        "code": "S39",
        "hex": "#FF7F41"
      },
      {
        "code": "S40",
        "hex": "#F99FC9"
      },
      {
        "code": "S41",
        "hex": "#9A5516"
      },
      {
        "code": "S42",
        "hex": "#A09F9D"
      },
      {
        "code": "S43",
        "hex": "#75787B"
      },
      {
        "code": "S44",
        "hex": "#9BCBEB"
      },
      {
        "code": "S45",
        "hex": "#00B2A9"
      },
      {
        "code": "S46",
        "hex": "#8EDD65"
      },
      {
        "code": "S47",
        "hex": "#A6631B"
      },
      {
        "code": "S48",
        "hex": "#FFC845"
      },
      {
        "code": "S49",
        "hex": "#973961"
      },
      {
        "code": "S50",
        "hex": "#FFB3AB"
      },
      {
        "code": "S51",
        "hex": "#FFF8DB"
      },
      {
        "code": "S52",
        "hex": "#F8E08E"
      },
      {
        "code": "S53",
        "hex": "#62A0E6"
      },
      {
        "code": "S54",
        "hex": "#0090DA"
      },
      {
        "code": "S55",
        "hex": "#ADDC91"
      },
      {
        "code": "S56",
        "hex": "#FF6A39"
      },
      {
        "code": "S57",
        "hex": "#B33D26"
      },
      {
        "code": "S58",
        "hex": "#BA0C2F"
      },
      {
        "code": "S59",
        "hex": "#5949A7"
      },
      {
        "code": "S60",
        "hex": "#9678D3"
      },
      {
        "code": "S61",
        "hex": "#E6DE77"
      },
      {
        "code": "S62",
        "hex": "#007C58"
      },
      {
        "code": "S63",
        "hex": "#4C5914"
      },
      {
        "code": "S64",
        "hex": "#2C2D65"
      },
      {
        "code": "S65",
        "hex": "#F0EC74"
      },
      {
        "code": "S66",
        "hex": "#EE5340"
      },
      {
        "code": "S67",
        "hex": "#ECC3B2"
      },
      {
        "code": "S68",
        "hex": "#E7B78A"
      },
      {
        "code": "S69",
        "hex": "#212721"
      },
      {
        "code": "S70",
        "hex": "#BABC16"
      },
      {
        "code": "S71",
        "hex": "#008522"
      },
      {
        "code": "S72",
        "hex": "#67D9DF"
      },
      {
        "code": "S73",
        "hex": "#48A9C5"
      },
      {
        "code": "S74",
        "hex": "#04A9C7"
      },
      {
        "code": "S75",
        "hex": "#0085AD"
      },
      {
        "code": "S76",
        "hex": "#00A7B5"
      },
      {
        "code": "S77",
        "hex": "#D9D9D6"
      },
      {
        "code": "S78",
        "hex": "#C8C9C7"
      },
      {
        "code": "S79",
        "hex": "#B1B3B3"
      },
      {
        "code": "S80",
        "hex": "#A2A569"
      },
      {
        "code": "S81",
        "hex": "#D5A286"
      },
      {
        "code": "S82",
        "hex": "#C58B68"
      },
      {
        "code": "S83",
        "hex": "#B15533"
      },
      {
        "code": "S84",
        "hex": "#AB5C57"
      },
      {
        "code": "S85",
        "hex": "#8A2A2B"
      },
      {
        "code": "S86",
        "hex": "#F29D04"
      },
      {
        "code": "S87",
        "hex": "#FF808B"
      },
      {
        "code": "S88",
        "hex": "#DA1884"
      },
      {
        "code": "S89",
        "hex": "#53565A"
      },
      {
        "code": "S90",
        "hex": "#FFC56E"
      },
      {
        "code": "S91",
        "hex": "#183028"
      },
      {
        "code": "S92",
        "hex": "#C69214"
      },
      {
        "code": "S93",
        "hex": "#EDC8A3"
      },
      {
        "code": "S94",
        "hex": "#EAA794"
      },
      {
        "code": "S95",
        "hex": "#E8927C"
      },
      {
        "code": "S96",
        "hex": "#FF8D6D"
      },
      {
        "code": "S97",
        "hex": "#E35205"
      },
      {
        "code": "S98",
        "hex": "#80B6E8"
      },
      {
        "code": "S99",
        "hex": "#5CA9CC"
      },
      {
        "code": "S100",
        "hex": "#5DB3CB"
      },
      {
        "code": "S101",
        "hex": "#00A3E1"
      },
      {
        "code": "S102",
        "hex": "#0077CF"
      },
      {
        "code": "S103",
        "hex": "#0067B9"
      },
      {
        "code": "S104",
        "hex": "#007DBA"
      },
      {
        "code": "S105",
        "hex": "#00859B"
      },
      {
        "code": "S106",
        "hex": "#0076A8"
      },
      {
        "code": "S107",
        "hex": "#007096"
      },
      {
        "code": "S108",
        "hex": "#E6C78A"
      },
      {
        "code": "S109",
        "hex": "#CEB888"
      },
      {
        "code": "S110",
        "hex": "#C6AA76"
      },
      {
        "code": "S111",
        "hex": "#A08629"
      },
      {
        "code": "S112",
        "hex": "#897630"
      },
      {
        "code": "S113",
        "hex": "#C3C6A8"
      },
      {
        "code": "S114",
        "hex": "#C0BB87"
      },
      {
        "code": "S115",
        "hex": "#B0AA7E"
      },
      {
        "code": "S116",
        "hex": "#A3AA83"
      },
      {
        "code": "S117",
        "hex": "#77744D"
      },
      {
        "code": "S118",
        "hex": "#5E6738"
      },
      {
        "code": "S119",
        "hex": "#98DBCE"
      },
      {
        "code": "S120",
        "hex": "#9BE3BF"
      },
      {
        "code": "S121",
        "hex": "#6BBBAE"
      },
      {
        "code": "S122",
        "hex": "#00BB7E"
      },
      {
        "code": "S123",
        "hex": "#31B700"
      },
      {
        "code": "S124",
        "hex": "#035F1D"
      },
      {
        "code": "S125",
        "hex": "#007864"
      },
      {
        "code": "S126",
        "hex": "#00685E"
      },
      {
        "code": "S127",
        "hex": "#DECDE7"
      },
      {
        "code": "S128",
        "hex": "#C98BDB"
      },
      {
        "code": "S129",
        "hex": "#DCB6C9"
      },
      {
        "code": "S130",
        "hex": "#DD74A1"
      },
      {
        "code": "S131",
        "hex": "#AD96DC"
      },
      {
        "code": "S132",
        "hex": "#EF426F"
      },
      {
        "code": "S133",
        "hex": "#C724B1"
      },
      {
        "code": "S134",
        "hex": "#8031A7"
      },
      {
        "code": "S135",
        "hex": "#9FAEE5"
      },
      {
        "code": "S136",
        "hex": "#B4B2E4"
      },
      {
        "code": "S137",
        "hex": "#5F8DDA"
      },
      {
        "code": "S138",
        "hex": "#5780D2"
      },
      {
        "code": "S139",
        "hex": "#5576D1"
      },
      {
        "code": "S140",
        "hex": "#3C62C3"
      },
      {
        "code": "S141",
        "hex": "#466CCA"
      },
      {
        "code": "S142",
        "hex": "#365ABD"
      },
      {
        "code": "S143",
        "hex": "#1E22AA"
      },
      {
        "code": "S144",
        "hex": "#002D72"
      },
      {
        "code": "S145",
        "hex": "#E9E186"
      },
      {
        "code": "S146",
        "hex": "#8C243D"
      },
      {
        "code": "S147",
        "hex": "#86C8BC"
      },
      {
        "code": "S148",
        "hex": "#724736"
      },
      {
        "code": "S149",
        "hex": "#FCD299"
      },
      {
        "code": "S150",
        "hex": "#8B84D7"
      },
      {
        "code": "S151",
        "hex": "#335525"
      },
      {
        "code": "S152",
        "hex": "#A7A4E0"
      },
      {
        "code": "S153",
        "hex": "#C6C4EA"
      },
      {
        "code": "S154",
        "hex": "#EBC29D"
      },
      {
        "code": "S155",
        "hex": "#C58B68"
      },
      {
        "code": "S156",
        "hex": "#63666A"
      },
      {
        "code": "S157",
        "hex": "#46494C"
      },
      {
        "code": "S158",
        "hex": "#191D19"
      },
      {
        "code": "S159",
        "hex": "#88888D"
      },
      {
        "code": "SE01",
        "hex": "#D1DDE6"
      },
      {
        "code": "SE02",
        "hex": "#9BB8E3"
      },
      {
        "code": "SE03",
        "hex": "#5E8AB4"
      },
      {
        "code": "SE04",
        "hex": "#6AD1E3"
      },
      {
        "code": "SE05",
        "hex": "#03C1AA"
      },
      {
        "code": "SE06",
        "hex": "#126AD4"
      },
      {
        "code": "SE07",
        "hex": "#BFA5B8"
      },
      {
        "code": "SE08",
        "hex": "#9B7793"
      },
      {
        "code": "SE09",
        "hex": "#693C5E"
      },
      {
        "code": "SE10",
        "hex": "#C964CF"
      },
      {
        "code": "SE11",
        "hex": "#AD1AAC"
      },
      {
        "code": "SE12",
        "hex": "#FFB25B"
      },
      {
        "code": "SE13",
        "hex": "#E6A65D"
      },
      {
        "code": "SE14",
        "hex": "#D38235"
      },
      {
        "code": "SE15",
        "hex": "#C16C18"
      },
      {
        "code": "SE16",
        "hex": "#F5B6CD"
      },
      {
        "code": "SE17",
        "hex": "#5D2A2C"
      }
    ]
  },
  "artkal-mini": {
    "id": "artkal-mini",
    "label": "Artkal Mini",
    "diameter": 2.6,
    "colors": [
      {
        "code": "MA1",
        "hex": "#FFF6D4"
      },
      {
        "code": "MA2",
        "hex": "#F6F9E5"
      },
      {
        "code": "MA3",
        "hex": "#FFFBAA"
      },
      {
        "code": "MA4",
        "hex": "#FFDF58"
      },
      {
        "code": "MA5",
        "hex": "#FECF4D"
      },
      {
        "code": "MA6",
        "hex": "#FFA80C"
      },
      {
        "code": "MA7",
        "hex": "#FF8837"
      },
      {
        "code": "MA8",
        "hex": "#EAC431"
      },
      {
        "code": "MA9",
        "hex": "#F1AA8F"
      },
      {
        "code": "MA10",
        "hex": "#FF8F42"
      },
      {
        "code": "MA11",
        "hex": "#FFE1A1"
      },
      {
        "code": "MA12",
        "hex": "#F4B39C"
      },
      {
        "code": "MA13",
        "hex": "#FFB100"
      },
      {
        "code": "MA14",
        "hex": "#FF6510"
      },
      {
        "code": "MA15",
        "hex": "#DAF05C"
      },
      {
        "code": "MA16",
        "hex": "#F9FBBE"
      },
      {
        "code": "MA17",
        "hex": "#FFD976"
      },
      {
        "code": "MA18",
        "hex": "#FFCA9A"
      },
      {
        "code": "MA19",
        "hex": "#EC7A92"
      },
      {
        "code": "MA20",
        "hex": "#E5BE55"
      },
      {
        "code": "MA21",
        "hex": "#FFE596"
      },
      {
        "code": "MA22",
        "hex": "#F7E898"
      },
      {
        "code": "MA23",
        "hex": "#F0CBB1"
      },
      {
        "code": "MA24",
        "hex": "#F5FCD1"
      },
      {
        "code": "MA25",
        "hex": "#F6D487"
      },
      {
        "code": "MA26",
        "hex": "#FFCB4B"
      },
      {
        "code": "MB1",
        "hex": "#D2E318"
      },
      {
        "code": "MB2",
        "hex": "#79CD41"
      },
      {
        "code": "MB3",
        "hex": "#82D7A1"
      },
      {
        "code": "MB4",
        "hex": "#65DF4F"
      },
      {
        "code": "MB5",
        "hex": "#5FC873"
      },
      {
        "code": "MB6",
        "hex": "#49D1AE"
      },
      {
        "code": "MB7",
        "hex": "#009696"
      },
      {
        "code": "MB8",
        "hex": "#08774F"
      },
      {
        "code": "MB9",
        "hex": "#183823"
      },
      {
        "code": "MB10",
        "hex": "#83CFC3"
      },
      {
        "code": "MB11",
        "hex": "#5A6A27"
      },
      {
        "code": "MB12",
        "hex": "#045F45"
      },
      {
        "code": "MB13",
        "hex": "#E2FFB3"
      },
      {
        "code": "MB14",
        "hex": "#9DD12E"
      },
      {
        "code": "MB15",
        "hex": "#254B3C"
      },
      {
        "code": "MB16",
        "hex": "#D0FCAD"
      },
      {
        "code": "MB17",
        "hex": "#8CA12A"
      },
      {
        "code": "MB18",
        "hex": "#D2D958"
      },
      {
        "code": "MB19",
        "hex": "#49BCA9"
      },
      {
        "code": "MB20",
        "hex": "#E8FDEC"
      },
      {
        "code": "MB21",
        "hex": "#188B81"
      },
      {
        "code": "MB22",
        "hex": "#0C5C5B"
      },
      {
        "code": "MB23",
        "hex": "#3D461B"
      },
      {
        "code": "MB24",
        "hex": "#EAFCB6"
      },
      {
        "code": "MB25",
        "hex": "#538771"
      },
      {
        "code": "MB26",
        "hex": "#8A7A40"
      },
      {
        "code": "MB27",
        "hex": "#D2DEB6"
      },
      {
        "code": "MB28",
        "hex": "#9FF4C2"
      },
      {
        "code": "MB29",
        "hex": "#BBD747"
      },
      {
        "code": "MB30",
        "hex": "#F5FFE6"
      },
      {
        "code": "MB31",
        "hex": "#BFE1C2"
      },
      {
        "code": "MB32",
        "hex": "#9FBA5C"
      },
      {
        "code": "MC1",
        "hex": "#D5E3DE"
      },
      {
        "code": "MC2",
        "hex": "#BBF1F4"
      },
      {
        "code": "MC3",
        "hex": "#73C0DF"
      },
      {
        "code": "MC4",
        "hex": "#33B3E1"
      },
      {
        "code": "MC5",
        "hex": "#00A3CA"
      },
      {
        "code": "MC6",
        "hex": "#58A0D9"
      },
      {
        "code": "MC7",
        "hex": "#0588CC"
      },
      {
        "code": "MC8",
        "hex": "#005F9E"
      },
      {
        "code": "MC9",
        "hex": "#086FB9"
      },
      {
        "code": "MC10",
        "hex": "#52B4E0"
      },
      {
        "code": "MC11",
        "hex": "#00A9B9"
      },
      {
        "code": "MC12",
        "hex": "#1C375A"
      },
      {
        "code": "MC13",
        "hex": "#CEE0F0"
      },
      {
        "code": "MC14",
        "hex": "#EBF5F4"
      },
      {
        "code": "MC15",
        "hex": "#00AAAD"
      },
      {
        "code": "MC16",
        "hex": "#004C7D"
      },
      {
        "code": "MC17",
        "hex": "#5BD4F6"
      },
      {
        "code": "MC18",
        "hex": "#36515C"
      },
      {
        "code": "MC19",
        "hex": "#0F909D"
      },
      {
        "code": "MC20",
        "hex": "#0084B7"
      },
      {
        "code": "MC21",
        "hex": "#DDECFA"
      },
      {
        "code": "MC22",
        "hex": "#84BAC2"
      },
      {
        "code": "MC23",
        "hex": "#CBDBDB"
      },
      {
        "code": "MC24",
        "hex": "#88BDE2"
      },
      {
        "code": "MC25",
        "hex": "#B3ECE0"
      },
      {
        "code": "MC26",
        "hex": "#3E9EBF"
      },
      {
        "code": "MC27",
        "hex": "#E9F0F3"
      },
      {
        "code": "MC28",
        "hex": "#C2CDE3"
      },
      {
        "code": "MC29",
        "hex": "#586B8F"
      },
      {
        "code": "MD1",
        "hex": "#7292E2"
      },
      {
        "code": "MD2",
        "hex": "#6E8CCC"
      },
      {
        "code": "MD3",
        "hex": "#13419A"
      },
      {
        "code": "MD4",
        "hex": "#1E3175"
      },
      {
        "code": "MD5",
        "hex": "#B850B2"
      },
      {
        "code": "MD6",
        "hex": "#AD92E9"
      },
      {
        "code": "MD7",
        "hex": "#5F2D91"
      },
      {
        "code": "MD8",
        "hex": "#D7CDF1"
      },
      {
        "code": "MD9",
        "hex": "#BDB2E6"
      },
      {
        "code": "MD10",
        "hex": "#251B58"
      },
      {
        "code": "MD11",
        "hex": "#A2BBE7"
      },
      {
        "code": "MD12",
        "hex": "#CF8BBE"
      },
      {
        "code": "MD13",
        "hex": "#B80096"
      },
      {
        "code": "MD14",
        "hex": "#A137A7"
      },
      {
        "code": "MD15",
        "hex": "#4A388A"
      },
      {
        "code": "MD16",
        "hex": "#DCE8F6"
      },
      {
        "code": "MD17",
        "hex": "#AECEF0"
      },
      {
        "code": "MD18",
        "hex": "#B38EDB"
      },
      {
        "code": "MD19",
        "hex": "#E8D2EA"
      },
      {
        "code": "MD20",
        "hex": "#B460C3"
      },
      {
        "code": "MD21",
        "hex": "#842A94"
      },
      {
        "code": "MD22",
        "hex": "#4B5E9E"
      },
      {
        "code": "MD23",
        "hex": "#D6D2E2"
      },
      {
        "code": "MD24",
        "hex": "#7776D1"
      },
      {
        "code": "MD25",
        "hex": "#3837A8"
      },
      {
        "code": "MD26",
        "hex": "#DDC8DD"
      },
      {
        "code": "ME1",
        "hex": "#FDD6C9"
      },
      {
        "code": "ME2",
        "hex": "#FFD8F4"
      },
      {
        "code": "ME3",
        "hex": "#FFA0C3"
      },
      {
        "code": "ME4",
        "hex": "#F67AAB"
      },
      {
        "code": "ME5",
        "hex": "#DA5B95"
      },
      {
        "code": "ME6",
        "hex": "#FF4B78"
      },
      {
        "code": "ME7",
        "hex": "#9E156B"
      },
      {
        "code": "ME8",
        "hex": "#FFE1E6"
      },
      {
        "code": "ME9",
        "hex": "#F378CA"
      },
      {
        "code": "ME10",
        "hex": "#BE316D"
      },
      {
        "code": "ME11",
        "hex": "#FFE8DA"
      },
      {
        "code": "ME12",
        "hex": "#FFA5C6"
      },
      {
        "code": "ME13",
        "hex": "#B53883"
      },
      {
        "code": "ME14",
        "hex": "#FFDDC7"
      },
      {
        "code": "ME15",
        "hex": "#E5C6D0"
      },
      {
        "code": "ME16",
        "hex": "#F9F2EB"
      },
      {
        "code": "ME17",
        "hex": "#E7DCE6"
      },
      {
        "code": "ME18",
        "hex": "#FFD3E6"
      },
      {
        "code": "ME19",
        "hex": "#FFD5EC"
      },
      {
        "code": "ME20",
        "hex": "#F3DCE8"
      },
      {
        "code": "ME21",
        "hex": "#BD9CA3"
      },
      {
        "code": "ME22",
        "hex": "#C578A5"
      },
      {
        "code": "ME23",
        "hex": "#A37A9B"
      },
      {
        "code": "ME24",
        "hex": "#F4E8FF"
      },
      {
        "code": "MF1",
        "hex": "#FF7F67"
      },
      {
        "code": "MF2",
        "hex": "#FF5D46"
      },
      {
        "code": "MF3",
        "hex": "#E3564A"
      },
      {
        "code": "MF4",
        "hex": "#C7270D"
      },
      {
        "code": "MF5",
        "hex": "#BE0A27"
      },
      {
        "code": "MF6",
        "hex": "#83411E"
      },
      {
        "code": "MF7",
        "hex": "#730037"
      },
      {
        "code": "MF8",
        "hex": "#AB0022"
      },
      {
        "code": "MF9",
        "hex": "#DE7995"
      },
      {
        "code": "MF10",
        "hex": "#AB613C"
      },
      {
        "code": "MF11",
        "hex": "#5C2929"
      },
      {
        "code": "MF12",
        "hex": "#F34461"
      },
      {
        "code": "MF13",
        "hex": "#C64239"
      },
      {
        "code": "MF14",
        "hex": "#FFA5BB"
      },
      {
        "code": "MF15",
        "hex": "#BC0018"
      },
      {
        "code": "MF16",
        "hex": "#FFD7CB"
      },
      {
        "code": "MF17",
        "hex": "#F19D8A"
      },
      {
        "code": "MF18",
        "hex": "#DC7B45"
      },
      {
        "code": "MF19",
        "hex": "#C74651"
      },
      {
        "code": "MF20",
        "hex": "#D8A89E"
      },
      {
        "code": "MF21",
        "hex": "#EB9DB9"
      },
      {
        "code": "MF22",
        "hex": "#FFD4D4"
      },
      {
        "code": "MF23",
        "hex": "#EA8474"
      },
      {
        "code": "MF24",
        "hex": "#F7C1C5"
      },
      {
        "code": "MF25",
        "hex": "#FC5768"
      },
      {
        "code": "MG1",
        "hex": "#FFE7C8"
      },
      {
        "code": "MG2",
        "hex": "#FFD6C3"
      },
      {
        "code": "MG3",
        "hex": "#EEB694"
      },
      {
        "code": "MG4",
        "hex": "#D9A58C"
      },
      {
        "code": "MG5",
        "hex": "#F49630"
      },
      {
        "code": "MG6",
        "hex": "#F19937"
      },
      {
        "code": "MG7",
        "hex": "#AC745B"
      },
      {
        "code": "MG8",
        "hex": "#694A42"
      },
      {
        "code": "MG9",
        "hex": "#F7CC9D"
      },
      {
        "code": "MG10",
        "hex": "#C7832F"
      },
      {
        "code": "MG11",
        "hex": "#D3C391"
      },
      {
        "code": "MG12",
        "hex": "#E6B986"
      },
      {
        "code": "MG13",
        "hex": "#C67B4F"
      },
      {
        "code": "MG14",
        "hex": "#8D6242"
      },
      {
        "code": "MG15",
        "hex": "#F6F7E2"
      },
      {
        "code": "MG16",
        "hex": "#F2E7D7"
      },
      {
        "code": "MG17",
        "hex": "#786562"
      },
      {
        "code": "MG18",
        "hex": "#FEF5EB"
      },
      {
        "code": "MG19",
        "hex": "#F0AB47"
      },
      {
        "code": "MG20",
        "hex": "#AE6949"
      },
      {
        "code": "MG21",
        "hex": "#BF8C6E"
      },
      {
        "code": "MH1",
        "hex": "#FFFFFF"
      },
      {
        "code": "MH2",
        "hex": "#FFFFFF"
      },
      {
        "code": "MH3",
        "hex": "#9B9B9B"
      },
      {
        "code": "MH4",
        "hex": "#6D6D6D"
      },
      {
        "code": "MH5",
        "hex": "#4D4D4D"
      },
      {
        "code": "MH6",
        "hex": "#3A3A3A"
      },
      {
        "code": "MH7",
        "hex": "#000000"
      },
      {
        "code": "MH8",
        "hex": "#FFF0F1"
      },
      {
        "code": "MH9",
        "hex": "#E3E6DF"
      },
      {
        "code": "MH10",
        "hex": "#E2E0E7"
      },
      {
        "code": "MH11",
        "hex": "#BCB8B5"
      },
      {
        "code": "MH12",
        "hex": "#F7F3E1"
      },
      {
        "code": "MH13",
        "hex": "#EADDC8"
      },
      {
        "code": "MH14",
        "hex": "#B8C8C5"
      },
      {
        "code": "MH15",
        "hex": "#99ABAC"
      },
      {
        "code": "MH16",
        "hex": "#444236"
      },
      {
        "code": "MH17",
        "hex": "#FAFBF5"
      },
      {
        "code": "MH18",
        "hex": "#FEFEEE"
      },
      {
        "code": "MH19",
        "hex": "#FBF2E4"
      },
      {
        "code": "MH20",
        "hex": "#9EAEAD"
      },
      {
        "code": "MH21",
        "hex": "#FDFFF2"
      },
      {
        "code": "MH22",
        "hex": "#EDEDE7"
      },
      {
        "code": "MH23",
        "hex": "#B4B8A7"
      },
      {
        "code": "MM1",
        "hex": "#AEBBA8"
      },
      {
        "code": "MM2",
        "hex": "#729376"
      },
      {
        "code": "MM3",
        "hex": "#6A8890"
      },
      {
        "code": "MM4",
        "hex": "#BEB39D"
      },
      {
        "code": "MM5",
        "hex": "#B8B78C"
      },
      {
        "code": "MM6",
        "hex": "#B2AC93"
      },
      {
        "code": "MM7",
        "hex": "#BC9F94"
      },
      {
        "code": "MM8",
        "hex": "#968381"
      },
      {
        "code": "MM9",
        "hex": "#B39D88"
      },
      {
        "code": "MM10",
        "hex": "#B796A3"
      },
      {
        "code": "MM11",
        "hex": "#B096B9"
      },
      {
        "code": "MM12",
        "hex": "#685951"
      },
      {
        "code": "MM13",
        "hex": "#C79582"
      },
      {
        "code": "MM14",
        "hex": "#CA694F"
      },
      {
        "code": "MM15",
        "hex": "#929FA9"
      }
    ]
  },
  "coco": {
    "id": "coco",
    "label": "COCO 291",
    "diameter": 2.6,
    "colors": [
      {
        "code": "E02",
        "hex": "#FAF4C8"
      },
      {
        "code": "E01",
        "hex": "#FFFFD5"
      },
      {
        "code": "E05",
        "hex": "#FEFF8B"
      },
      {
        "code": "E07",
        "hex": "#FBED56"
      },
      {
        "code": "D03",
        "hex": "#F4D738"
      },
      {
        "code": "D05",
        "hex": "#FEAC4C"
      },
      {
        "code": "D08",
        "hex": "#FE8B4C"
      },
      {
        "code": "E08",
        "hex": "#FFDA45"
      },
      {
        "code": "D06",
        "hex": "#FF995B"
      },
      {
        "code": "D07",
        "hex": "#F77C31"
      },
      {
        "code": "D01",
        "hex": "#FFDD99"
      },
      {
        "code": "K09",
        "hex": "#FE9F72"
      },
      {
        "code": "D04",
        "hex": "#FFC365"
      },
      {
        "code": "C05",
        "hex": "#FD543D"
      },
      {
        "code": "E04",
        "hex": "#FFF365"
      },
      {
        "code": "E03",
        "hex": "#FFFF9F"
      },
      {
        "code": "E06",
        "hex": "#FFE36E"
      },
      {
        "code": "D02",
        "hex": "#FEBE7D"
      },
      {
        "code": "K10",
        "hex": "#FD7C72"
      },
      {
        "code": "E09",
        "hex": "#FFD568"
      },
      {
        "code": "E10",
        "hex": "#FFE395"
      },
      {
        "code": "E11",
        "hex": "#F4F57D"
      },
      {
        "code": "E12",
        "hex": "#E6C9B7"
      },
      {
        "code": "E13",
        "hex": "#F7F8A2"
      },
      {
        "code": "E14",
        "hex": "#FFD67D"
      },
      {
        "code": "E15",
        "hex": "#FFC830"
      },
      {
        "code": "F05",
        "hex": "#E6EE31"
      },
      {
        "code": "F08",
        "hex": "#63F347"
      },
      {
        "code": "F04",
        "hex": "#9EF780"
      },
      {
        "code": "F09",
        "hex": "#5DE035"
      },
      {
        "code": "F10",
        "hex": "#35E352"
      },
      {
        "code": "G04",
        "hex": "#65E2A6"
      },
      {
        "code": "G05",
        "hex": "#3DAF80"
      },
      {
        "code": "F11",
        "hex": "#1C9C4F"
      },
      {
        "code": "F16",
        "hex": "#27523A"
      },
      {
        "code": "G03",
        "hex": "#95D3C2"
      },
      {
        "code": "F14",
        "hex": "#5D722A"
      },
      {
        "code": "F12",
        "hex": "#166F41"
      },
      {
        "code": "F02",
        "hex": "#CAEB7B"
      },
      {
        "code": "F06",
        "hex": "#ADE946"
      },
      {
        "code": "F15",
        "hex": "#2E5132"
      },
      {
        "code": "F03",
        "hex": "#C5ED9C"
      },
      {
        "code": "F13",
        "hex": "#9BB13A"
      },
      {
        "code": "F07",
        "hex": "#E6EE49"
      },
      {
        "code": "G06",
        "hex": "#24B88C"
      },
      {
        "code": "G02",
        "hex": "#C2F0CC"
      },
      {
        "code": "G07",
        "hex": "#156A6B"
      },
      {
        "code": "G08",
        "hex": "#0B3C43"
      },
      {
        "code": "F17",
        "hex": "#303A21"
      },
      {
        "code": "F01",
        "hex": "#EEFCA5"
      },
      {
        "code": "F18",
        "hex": "#4E846D"
      },
      {
        "code": "F19",
        "hex": "#8D7A35"
      },
      {
        "code": "F20",
        "hex": "#CCE1AF"
      },
      {
        "code": "F21",
        "hex": "#9EE5B9"
      },
      {
        "code": "F22",
        "hex": "#C5E254"
      },
      {
        "code": "F23",
        "hex": "#E2FCB1"
      },
      {
        "code": "F24",
        "hex": "#B0E792"
      },
      {
        "code": "F25",
        "hex": "#9CAB5A"
      },
      {
        "code": "G01",
        "hex": "#E8FFE7"
      },
      {
        "code": "H03",
        "hex": "#A9F9FC"
      },
      {
        "code": "H04",
        "hex": "#A0E2FB"
      },
      {
        "code": "H05",
        "hex": "#41CCFF"
      },
      {
        "code": "H07",
        "hex": "#01ACEB"
      },
      {
        "code": "H08",
        "hex": "#50AAF0"
      },
      {
        "code": "H13",
        "hex": "#3677D2"
      },
      {
        "code": "H14",
        "hex": "#0F54C0"
      },
      {
        "code": "H16",
        "hex": "#324BCA"
      },
      {
        "code": "H09",
        "hex": "#3EBCE2"
      },
      {
        "code": "H10",
        "hex": "#28DDDE"
      },
      {
        "code": "H23",
        "hex": "#1C334D"
      },
      {
        "code": "H01",
        "hex": "#CDE8FF"
      },
      {
        "code": "H02",
        "hex": "#D5FDFF"
      },
      {
        "code": "H11",
        "hex": "#22C4C6"
      },
      {
        "code": "H18",
        "hex": "#1557A8"
      },
      {
        "code": "H19",
        "hex": "#04D1F6"
      },
      {
        "code": "H24",
        "hex": "#1D3344"
      },
      {
        "code": "H12",
        "hex": "#1887A2"
      },
      {
        "code": "H17",
        "hex": "#176DAF"
      },
      {
        "code": "H06",
        "hex": "#BEDDFF"
      },
      {
        "code": "H25",
        "hex": "#67B4BE"
      },
      {
        "code": "H26",
        "hex": "#C8E2FF"
      },
      {
        "code": "H27",
        "hex": "#7CC4FF"
      },
      {
        "code": "H28",
        "hex": "#A9E5E5"
      },
      {
        "code": "H29",
        "hex": "#3CAED8"
      },
      {
        "code": "H30",
        "hex": "#D3DFFA"
      },
      {
        "code": "H31",
        "hex": "#BBCFED"
      },
      {
        "code": "H32",
        "hex": "#34488E"
      },
      {
        "code": "J07",
        "hex": "#AEB4F2"
      },
      {
        "code": "J08",
        "hex": "#858EDD"
      },
      {
        "code": "H15",
        "hex": "#2F54AF"
      },
      {
        "code": "H20",
        "hex": "#182A84"
      },
      {
        "code": "J12",
        "hex": "#B843C5"
      },
      {
        "code": "J11",
        "hex": "#AC7BDE"
      },
      {
        "code": "J15",
        "hex": "#8854B3"
      },
      {
        "code": "J03",
        "hex": "#E2D3FF"
      },
      {
        "code": "J04",
        "hex": "#D5B9F8"
      },
      {
        "code": "J19",
        "hex": "#361851"
      },
      {
        "code": "J06",
        "hex": "#B9BAE1"
      },
      {
        "code": "J10",
        "hex": "#DE9AD4"
      },
      {
        "code": "J14",
        "hex": "#B90095"
      },
      {
        "code": "J16",
        "hex": "#8B279B"
      },
      {
        "code": "H22",
        "hex": "#2F1F90"
      },
      {
        "code": "J01",
        "hex": "#E3E1EE"
      },
      {
        "code": "J05",
        "hex": "#C4D4F6"
      },
      {
        "code": "J13",
        "hex": "#A45EC7"
      },
      {
        "code": "J09",
        "hex": "#D8C3D7"
      },
      {
        "code": "J17",
        "hex": "#9C32B2"
      },
      {
        "code": "J18",
        "hex": "#9A009B"
      },
      {
        "code": "H21",
        "hex": "#333A95"
      },
      {
        "code": "J02",
        "hex": "#EBDAFC"
      },
      {
        "code": "J20",
        "hex": "#7786E5"
      },
      {
        "code": "J21",
        "hex": "#494FC7"
      },
      {
        "code": "J22",
        "hex": "#DFC2F8"
      },
      {
        "code": "K03",
        "hex": "#FDD3CC"
      },
      {
        "code": "K15",
        "hex": "#FEC0DF"
      },
      {
        "code": "K17",
        "hex": "#FFB7E7"
      },
      {
        "code": "K21",
        "hex": "#E8649E"
      },
      {
        "code": "K19",
        "hex": "#F551A2"
      },
      {
        "code": "K22",
        "hex": "#F13D74"
      },
      {
        "code": "K25",
        "hex": "#C63478"
      },
      {
        "code": "K12",
        "hex": "#FFDBE9"
      },
      {
        "code": "K18",
        "hex": "#E970CC"
      },
      {
        "code": "K23",
        "hex": "#D33793"
      },
      {
        "code": "K02",
        "hex": "#FCDDD2"
      },
      {
        "code": "K16",
        "hex": "#F78FC3"
      },
      {
        "code": "K24",
        "hex": "#B5006D"
      },
      {
        "code": "K05",
        "hex": "#FFD1BA"
      },
      {
        "code": "K04",
        "hex": "#F8C7C9"
      },
      {
        "code": "K01",
        "hex": "#FFF3EB"
      },
      {
        "code": "K11",
        "hex": "#FFE2EA"
      },
      {
        "code": "K13",
        "hex": "#FFC7DB"
      },
      {
        "code": "K14",
        "hex": "#FEBAD5"
      },
      {
        "code": "K26",
        "hex": "#D8C7D1"
      },
      {
        "code": "K27",
        "hex": "#BD9DA1"
      },
      {
        "code": "K28",
        "hex": "#B785A1"
      },
      {
        "code": "K29",
        "hex": "#937A8D"
      },
      {
        "code": "K30",
        "hex": "#E1BCE8"
      },
      {
        "code": "K08",
        "hex": "#FD957B"
      },
      {
        "code": "C02",
        "hex": "#FC3D46"
      },
      {
        "code": "C03",
        "hex": "#F74941"
      },
      {
        "code": "C06",
        "hex": "#FC283C"
      },
      {
        "code": "C07",
        "hex": "#E7002F"
      },
      {
        "code": "Z21",
        "hex": "#943630"
      },
      {
        "code": "C10",
        "hex": "#971937"
      },
      {
        "code": "C09",
        "hex": "#BC0028"
      },
      {
        "code": "K20",
        "hex": "#E2677A"
      },
      {
        "code": "Z20",
        "hex": "#8A4526"
      },
      {
        "code": "Z23",
        "hex": "#5A2121"
      },
      {
        "code": "C01",
        "hex": "#FD4E6A"
      },
      {
        "code": "C04",
        "hex": "#F35744"
      },
      {
        "code": "K07",
        "hex": "#FFA9AD"
      },
      {
        "code": "C08",
        "hex": "#D30022"
      },
      {
        "code": "K06",
        "hex": "#FEC2A6"
      },
      {
        "code": "K31",
        "hex": "#E69C79"
      },
      {
        "code": "K32",
        "hex": "#D37C46"
      },
      {
        "code": "K33",
        "hex": "#C1444A"
      },
      {
        "code": "K34",
        "hex": "#CD9391"
      },
      {
        "code": "K35",
        "hex": "#F7B4C6"
      },
      {
        "code": "K36",
        "hex": "#FDC0D0"
      },
      {
        "code": "K37",
        "hex": "#F67E66"
      },
      {
        "code": "K38",
        "hex": "#E698AA"
      },
      {
        "code": "K39",
        "hex": "#E54B4F"
      },
      {
        "code": "Z02",
        "hex": "#FFE2CE"
      },
      {
        "code": "Z05",
        "hex": "#FFC4AA"
      },
      {
        "code": "Z06",
        "hex": "#F4C3A5"
      },
      {
        "code": "Z08",
        "hex": "#E1B383"
      },
      {
        "code": "Z10",
        "hex": "#EDB045"
      },
      {
        "code": "Z11",
        "hex": "#E99C17"
      },
      {
        "code": "Z18",
        "hex": "#9D5B3E"
      },
      {
        "code": "Z22",
        "hex": "#753832"
      },
      {
        "code": "Z09",
        "hex": "#E6B483"
      },
      {
        "code": "Z15",
        "hex": "#D98C39"
      },
      {
        "code": "Z07",
        "hex": "#E0C593"
      },
      {
        "code": "Z13",
        "hex": "#FFC890"
      },
      {
        "code": "Z14",
        "hex": "#B7714A"
      },
      {
        "code": "Z17",
        "hex": "#8D614C"
      },
      {
        "code": "Z03",
        "hex": "#FCF9E0"
      },
      {
        "code": "Z04",
        "hex": "#F2D9BA"
      },
      {
        "code": "Z16",
        "hex": "#78524B"
      },
      {
        "code": "Z01",
        "hex": "#FFE4CC"
      },
      {
        "code": "Z12",
        "hex": "#E07935"
      },
      {
        "code": "Z19",
        "hex": "#A94023"
      },
      {
        "code": "Z24",
        "hex": "#B88558"
      },
      {
        "code": "A02",
        "hex": "#FDFBFF"
      },
      {
        "code": "A01",
        "hex": "#FEFFFF"
      },
      {
        "code": "B03",
        "hex": "#B6B1BA"
      },
      {
        "code": "B05",
        "hex": "#89858C"
      },
      {
        "code": "B06",
        "hex": "#48464E"
      },
      {
        "code": "B07",
        "hex": "#2F2B2F"
      },
      {
        "code": "B09",
        "hex": "#000000"
      },
      {
        "code": "A09",
        "hex": "#E7D6DB"
      },
      {
        "code": "A08",
        "hex": "#EDEDED"
      },
      {
        "code": "A10",
        "hex": "#EEE9EA"
      },
      {
        "code": "B01",
        "hex": "#CECDD5"
      },
      {
        "code": "A04",
        "hex": "#FFF5ED"
      },
      {
        "code": "A06",
        "hex": "#F5ECD2"
      },
      {
        "code": "B02",
        "hex": "#CFD7D3"
      },
      {
        "code": "B04",
        "hex": "#98A6A8"
      },
      {
        "code": "B08",
        "hex": "#1D1414"
      },
      {
        "code": "A07",
        "hex": "#F1EDED"
      },
      {
        "code": "A03",
        "hex": "#FFFDF0"
      },
      {
        "code": "A05",
        "hex": "#F6EFE2"
      },
      {
        "code": "B10",
        "hex": "#949FA3"
      },
      {
        "code": "A11",
        "hex": "#FFFBE1"
      },
      {
        "code": "A12",
        "hex": "#CACAD4"
      },
      {
        "code": "B11",
        "hex": "#9A9D94"
      },
      {
        "code": "Y01",
        "hex": "#BCC6B8"
      },
      {
        "code": "Y02",
        "hex": "#8AA386"
      },
      {
        "code": "Y03",
        "hex": "#697D80"
      },
      {
        "code": "Y04",
        "hex": "#E3D2BC"
      },
      {
        "code": "Y05",
        "hex": "#D0CCAA"
      },
      {
        "code": "Y06",
        "hex": "#B0A782"
      },
      {
        "code": "Y07",
        "hex": "#B4A497"
      },
      {
        "code": "Y08",
        "hex": "#B38281"
      },
      {
        "code": "Y09",
        "hex": "#A58767"
      },
      {
        "code": "Y10",
        "hex": "#C5B2BC"
      },
      {
        "code": "Y11",
        "hex": "#9F7594"
      },
      {
        "code": "Y12",
        "hex": "#644749"
      },
      {
        "code": "Y13",
        "hex": "#D19066"
      },
      {
        "code": "Y14",
        "hex": "#C77362"
      },
      {
        "code": "Y15",
        "hex": "#757D78"
      },
      {
        "code": "M01",
        "hex": "#FCF7F8"
      },
      {
        "code": "M02",
        "hex": "#B0A9AC"
      },
      {
        "code": "M03",
        "hex": "#AFDCAB"
      },
      {
        "code": "M04",
        "hex": "#FEA49F"
      },
      {
        "code": "M05",
        "hex": "#EE8C3E"
      },
      {
        "code": "M06",
        "hex": "#5FD0A7"
      },
      {
        "code": "M07",
        "hex": "#EB9270"
      },
      {
        "code": "M08",
        "hex": "#F0D958"
      },
      {
        "code": "M09",
        "hex": "#D9D9D9"
      },
      {
        "code": "M10",
        "hex": "#D9C7EA"
      },
      {
        "code": "M11",
        "hex": "#F3ECC9"
      },
      {
        "code": "M12",
        "hex": "#E6EEF2"
      },
      {
        "code": "M13",
        "hex": "#AACBEF"
      },
      {
        "code": "M14",
        "hex": "#337680"
      },
      {
        "code": "M15",
        "hex": "#668575"
      },
      {
        "code": "M16",
        "hex": "#FEBF45"
      },
      {
        "code": "M17",
        "hex": "#FEA324"
      },
      {
        "code": "M18",
        "hex": "#FEB89F"
      },
      {
        "code": "M19",
        "hex": "#FFFEEC"
      },
      {
        "code": "M21",
        "hex": "#FEBECF"
      },
      {
        "code": "M20",
        "hex": "#ECBEBF"
      },
      {
        "code": "M22",
        "hex": "#E4A89F"
      },
      {
        "code": "M23",
        "hex": "#A56268"
      },
      {
        "code": "W3",
        "hex": "#F2A5E8"
      },
      {
        "code": "W4",
        "hex": "#E9EC91"
      },
      {
        "code": "W1",
        "hex": "#FFFF00"
      },
      {
        "code": "W2",
        "hex": "#FFEBFA"
      },
      {
        "code": "W5",
        "hex": "#76CEDE"
      },
      {
        "code": "L01",
        "hex": "#D50D21"
      },
      {
        "code": "L02",
        "hex": "#F92F83"
      },
      {
        "code": "L03",
        "hex": "#FD8324"
      },
      {
        "code": "L04",
        "hex": "#F8EC31"
      },
      {
        "code": "L05",
        "hex": "#35C75B"
      },
      {
        "code": "L06",
        "hex": "#238891"
      },
      {
        "code": "L07",
        "hex": "#19779D"
      },
      {
        "code": "L08",
        "hex": "#1A60C3"
      },
      {
        "code": "L09",
        "hex": "#9A56B4"
      },
      {
        "code": "L10",
        "hex": "#FFDB4C"
      },
      {
        "code": "L11",
        "hex": "#FFEBFB"
      },
      {
        "code": "L12",
        "hex": "#D8D5CE"
      },
      {
        "code": "L13",
        "hex": "#55514C"
      },
      {
        "code": "S1",
        "hex": "#9FE4DF"
      },
      {
        "code": "S2",
        "hex": "#77CEE9"
      },
      {
        "code": "S3",
        "hex": "#3ECFCA"
      },
      {
        "code": "S4",
        "hex": "#4A867A"
      },
      {
        "code": "S5",
        "hex": "#7FCD9D"
      },
      {
        "code": "S6",
        "hex": "#CDE55D"
      },
      {
        "code": "S7",
        "hex": "#E8C7B4"
      },
      {
        "code": "S8",
        "hex": "#AD6F3C"
      },
      {
        "code": "S9",
        "hex": "#6C372F"
      },
      {
        "code": "S10",
        "hex": "#FEB872"
      },
      {
        "code": "S11",
        "hex": "#F3C1C0"
      },
      {
        "code": "S12",
        "hex": "#C9675E"
      },
      {
        "code": "S13",
        "hex": "#D293BE"
      },
      {
        "code": "S14",
        "hex": "#EA8CB1"
      },
      {
        "code": "S15",
        "hex": "#9C87D6"
      },
      {
        "code": "L14",
        "hex": "#FFFFFF"
      },
      {
        "code": "N01",
        "hex": "#FD6FB4"
      },
      {
        "code": "N02",
        "hex": "#FEB481"
      },
      {
        "code": "N03",
        "hex": "#D7FAA0"
      },
      {
        "code": "N04",
        "hex": "#8BDBFA"
      },
      {
        "code": "N05",
        "hex": "#E987EA"
      },
      {
        "code": "GB1",
        "hex": "#DAABB3"
      },
      {
        "code": "GB2",
        "hex": "#D6AA87"
      },
      {
        "code": "GB3",
        "hex": "#C1BD8D"
      },
      {
        "code": "GB4",
        "hex": "#96869F"
      },
      {
        "code": "GB5",
        "hex": "#8490A6"
      },
      {
        "code": "GB6",
        "hex": "#94BFE2"
      },
      {
        "code": "GB7",
        "hex": "#E2A9D2"
      },
      {
        "code": "GB8",
        "hex": "#AB91C0"
      }
    ]
  },
  "mard": {
    "id": "mard",
    "label": "MARD 221",
    "diameter": 5,
    "colors": [
      {
        "code": "A1",
        "hex": "#FAF4C8"
      },
      {
        "code": "A2",
        "hex": "#FFFFD5"
      },
      {
        "code": "A3",
        "hex": "#FEFF8B"
      },
      {
        "code": "A4",
        "hex": "#FBED56"
      },
      {
        "code": "A5",
        "hex": "#F4D738"
      },
      {
        "code": "A6",
        "hex": "#FEAC4C"
      },
      {
        "code": "A7",
        "hex": "#FE8B4C"
      },
      {
        "code": "A8",
        "hex": "#FFDA45"
      },
      {
        "code": "A9",
        "hex": "#FF995B"
      },
      {
        "code": "A10",
        "hex": "#F77C31"
      },
      {
        "code": "A11",
        "hex": "#FFDD99"
      },
      {
        "code": "A12",
        "hex": "#FE9F72"
      },
      {
        "code": "A13",
        "hex": "#FFC365"
      },
      {
        "code": "A14",
        "hex": "#FD543D"
      },
      {
        "code": "A15",
        "hex": "#FFF365"
      },
      {
        "code": "A16",
        "hex": "#FFFF9F"
      },
      {
        "code": "A17",
        "hex": "#FFE36E"
      },
      {
        "code": "A18",
        "hex": "#FEBE7D"
      },
      {
        "code": "A19",
        "hex": "#FD7C72"
      },
      {
        "code": "A20",
        "hex": "#FFD568"
      },
      {
        "code": "A21",
        "hex": "#FFE395"
      },
      {
        "code": "A22",
        "hex": "#F4F57D"
      },
      {
        "code": "A23",
        "hex": "#E6C9B7"
      },
      {
        "code": "A24",
        "hex": "#F7F8A2"
      },
      {
        "code": "A25",
        "hex": "#FFD67D"
      },
      {
        "code": "A26",
        "hex": "#FFC830"
      },
      {
        "code": "B1",
        "hex": "#E6EE31"
      },
      {
        "code": "B2",
        "hex": "#63F347"
      },
      {
        "code": "B3",
        "hex": "#9EF780"
      },
      {
        "code": "B4",
        "hex": "#5DE035"
      },
      {
        "code": "B5",
        "hex": "#35E352"
      },
      {
        "code": "B6",
        "hex": "#65E2A6"
      },
      {
        "code": "B7",
        "hex": "#3DAF80"
      },
      {
        "code": "B8",
        "hex": "#1C9C4F"
      },
      {
        "code": "B9",
        "hex": "#27523A"
      },
      {
        "code": "B10",
        "hex": "#95D3C2"
      },
      {
        "code": "B11",
        "hex": "#5D722A"
      },
      {
        "code": "B12",
        "hex": "#166F41"
      },
      {
        "code": "B13",
        "hex": "#CAEB7B"
      },
      {
        "code": "B14",
        "hex": "#ADE946"
      },
      {
        "code": "B15",
        "hex": "#2E5132"
      },
      {
        "code": "B16",
        "hex": "#C5ED9C"
      },
      {
        "code": "B17",
        "hex": "#9BB13A"
      },
      {
        "code": "B18",
        "hex": "#E6EE49"
      },
      {
        "code": "B19",
        "hex": "#24B88C"
      },
      {
        "code": "B20",
        "hex": "#C2F0CC"
      },
      {
        "code": "B21",
        "hex": "#156A6B"
      },
      {
        "code": "B22",
        "hex": "#0B3C43"
      },
      {
        "code": "B23",
        "hex": "#303A21"
      },
      {
        "code": "B24",
        "hex": "#EEFCA5"
      },
      {
        "code": "B25",
        "hex": "#4E846D"
      },
      {
        "code": "B26",
        "hex": "#8D7A35"
      },
      {
        "code": "B27",
        "hex": "#CCE1AF"
      },
      {
        "code": "B28",
        "hex": "#9EE5B9"
      },
      {
        "code": "B29",
        "hex": "#C5E254"
      },
      {
        "code": "B30",
        "hex": "#E2FCB1"
      },
      {
        "code": "B31",
        "hex": "#B0E792"
      },
      {
        "code": "B32",
        "hex": "#9CAB5A"
      },
      {
        "code": "C1",
        "hex": "#E8FFE7"
      },
      {
        "code": "C2",
        "hex": "#A9F9FC"
      },
      {
        "code": "C3",
        "hex": "#A0E2FB"
      },
      {
        "code": "C4",
        "hex": "#41CCFF"
      },
      {
        "code": "C5",
        "hex": "#01ACEB"
      },
      {
        "code": "C6",
        "hex": "#50AAF0"
      },
      {
        "code": "C7",
        "hex": "#3677D2"
      },
      {
        "code": "C8",
        "hex": "#0F54C0"
      },
      {
        "code": "C9",
        "hex": "#324BCA"
      },
      {
        "code": "C10",
        "hex": "#3EBCE2"
      },
      {
        "code": "C11",
        "hex": "#28DDDE"
      },
      {
        "code": "C12",
        "hex": "#1C334D"
      },
      {
        "code": "C13",
        "hex": "#CDE8FF"
      },
      {
        "code": "C14",
        "hex": "#D5FDFF"
      },
      {
        "code": "C15",
        "hex": "#22C4C6"
      },
      {
        "code": "C16",
        "hex": "#1557A8"
      },
      {
        "code": "C17",
        "hex": "#04D1F6"
      },
      {
        "code": "C18",
        "hex": "#1D3344"
      },
      {
        "code": "C19",
        "hex": "#1887A2"
      },
      {
        "code": "C20",
        "hex": "#176DAF"
      },
      {
        "code": "C21",
        "hex": "#BEDDFF"
      },
      {
        "code": "C22",
        "hex": "#67B4BE"
      },
      {
        "code": "C23",
        "hex": "#C8E2FF"
      },
      {
        "code": "C24",
        "hex": "#7CC4FF"
      },
      {
        "code": "C25",
        "hex": "#A9E5E5"
      },
      {
        "code": "C26",
        "hex": "#3CAED8"
      },
      {
        "code": "C27",
        "hex": "#D3DFFA"
      },
      {
        "code": "C28",
        "hex": "#BBCFED"
      },
      {
        "code": "C29",
        "hex": "#34488E"
      },
      {
        "code": "D1",
        "hex": "#AEB4F2"
      },
      {
        "code": "D2",
        "hex": "#858EDD"
      },
      {
        "code": "D3",
        "hex": "#2F54AF"
      },
      {
        "code": "D4",
        "hex": "#182A84"
      },
      {
        "code": "D5",
        "hex": "#B843C5"
      },
      {
        "code": "D6",
        "hex": "#AC7BDE"
      },
      {
        "code": "D7",
        "hex": "#8854B3"
      },
      {
        "code": "D8",
        "hex": "#E2D3FF"
      },
      {
        "code": "D9",
        "hex": "#D5B9F8"
      },
      {
        "code": "D10",
        "hex": "#361851"
      },
      {
        "code": "D11",
        "hex": "#B9BAE1"
      },
      {
        "code": "D12",
        "hex": "#DE9AD4"
      },
      {
        "code": "D13",
        "hex": "#B90095"
      },
      {
        "code": "D14",
        "hex": "#8B279B"
      },
      {
        "code": "D15",
        "hex": "#2F1F90"
      },
      {
        "code": "D16",
        "hex": "#E3E1EE"
      },
      {
        "code": "D17",
        "hex": "#C4D4F6"
      },
      {
        "code": "D18",
        "hex": "#A45EC7"
      },
      {
        "code": "D19",
        "hex": "#D8C3D7"
      },
      {
        "code": "D20",
        "hex": "#9C32B2"
      },
      {
        "code": "D21",
        "hex": "#9A009B"
      },
      {
        "code": "D22",
        "hex": "#333A95"
      },
      {
        "code": "D23",
        "hex": "#EBDAFC"
      },
      {
        "code": "D24",
        "hex": "#7786E5"
      },
      {
        "code": "D25",
        "hex": "#494FC7"
      },
      {
        "code": "D26",
        "hex": "#DFC2F8"
      },
      {
        "code": "E1",
        "hex": "#FDD3CC"
      },
      {
        "code": "E2",
        "hex": "#FEC0DF"
      },
      {
        "code": "E3",
        "hex": "#FFB7E7"
      },
      {
        "code": "E4",
        "hex": "#E8649E"
      },
      {
        "code": "E5",
        "hex": "#F551A2"
      },
      {
        "code": "E6",
        "hex": "#F13D74"
      },
      {
        "code": "E7",
        "hex": "#C63478"
      },
      {
        "code": "E8",
        "hex": "#FFDBE9"
      },
      {
        "code": "E9",
        "hex": "#E970CC"
      },
      {
        "code": "E10",
        "hex": "#D33793"
      },
      {
        "code": "E11",
        "hex": "#FCDDD2"
      },
      {
        "code": "E12",
        "hex": "#F78FC3"
      },
      {
        "code": "E13",
        "hex": "#B5006D"
      },
      {
        "code": "E14",
        "hex": "#FFD1BA"
      },
      {
        "code": "E15",
        "hex": "#F8C7C9"
      },
      {
        "code": "E16",
        "hex": "#FFF3EB"
      },
      {
        "code": "E17",
        "hex": "#FFE2EA"
      },
      {
        "code": "E18",
        "hex": "#FFC7DB"
      },
      {
        "code": "E19",
        "hex": "#FEBAD5"
      },
      {
        "code": "E20",
        "hex": "#D8C7D1"
      },
      {
        "code": "E21",
        "hex": "#BD9DA1"
      },
      {
        "code": "E22",
        "hex": "#B785A1"
      },
      {
        "code": "E23",
        "hex": "#937A8D"
      },
      {
        "code": "E24",
        "hex": "#E1BCE8"
      },
      {
        "code": "F1",
        "hex": "#FD957B"
      },
      {
        "code": "F2",
        "hex": "#FC3D46"
      },
      {
        "code": "F3",
        "hex": "#F74941"
      },
      {
        "code": "F4",
        "hex": "#FC283C"
      },
      {
        "code": "F5",
        "hex": "#E7002F"
      },
      {
        "code": "F6",
        "hex": "#943630"
      },
      {
        "code": "F7",
        "hex": "#971937"
      },
      {
        "code": "F8",
        "hex": "#BC0028"
      },
      {
        "code": "F9",
        "hex": "#E2677A"
      },
      {
        "code": "F10",
        "hex": "#8A4526"
      },
      {
        "code": "F11",
        "hex": "#5A2121"
      },
      {
        "code": "F12",
        "hex": "#FD4E6A"
      },
      {
        "code": "F13",
        "hex": "#F35744"
      },
      {
        "code": "F14",
        "hex": "#FFA9AD"
      },
      {
        "code": "F15",
        "hex": "#D30022"
      },
      {
        "code": "F16",
        "hex": "#FEC2A6"
      },
      {
        "code": "F17",
        "hex": "#E69C79"
      },
      {
        "code": "F18",
        "hex": "#D37C46"
      },
      {
        "code": "F19",
        "hex": "#C1444A"
      },
      {
        "code": "F20",
        "hex": "#CD9391"
      },
      {
        "code": "F21",
        "hex": "#F7B4C6"
      },
      {
        "code": "F22",
        "hex": "#FDC0D0"
      },
      {
        "code": "F23",
        "hex": "#F67E66"
      },
      {
        "code": "F24",
        "hex": "#E698AA"
      },
      {
        "code": "F25",
        "hex": "#E54B4F"
      },
      {
        "code": "G1",
        "hex": "#FFE2CE"
      },
      {
        "code": "G2",
        "hex": "#FFC4AA"
      },
      {
        "code": "G3",
        "hex": "#F4C3A5"
      },
      {
        "code": "G4",
        "hex": "#E1B383"
      },
      {
        "code": "G5",
        "hex": "#EDB045"
      },
      {
        "code": "G6",
        "hex": "#E99C17"
      },
      {
        "code": "G7",
        "hex": "#9D5B3E"
      },
      {
        "code": "G8",
        "hex": "#753832"
      },
      {
        "code": "G9",
        "hex": "#E6B483"
      },
      {
        "code": "G10",
        "hex": "#D98C39"
      },
      {
        "code": "G11",
        "hex": "#E0C593"
      },
      {
        "code": "G12",
        "hex": "#FFC890"
      },
      {
        "code": "G13",
        "hex": "#B7714A"
      },
      {
        "code": "G14",
        "hex": "#8D614C"
      },
      {
        "code": "G15",
        "hex": "#FCF9E0"
      },
      {
        "code": "G16",
        "hex": "#F2D9BA"
      },
      {
        "code": "G17",
        "hex": "#78524B"
      },
      {
        "code": "G18",
        "hex": "#FFE4CC"
      },
      {
        "code": "G19",
        "hex": "#E07935"
      },
      {
        "code": "G20",
        "hex": "#A94023"
      },
      {
        "code": "G21",
        "hex": "#B88558"
      },
      {
        "code": "H1",
        "hex": "#FDFBFF"
      },
      {
        "code": "H2",
        "hex": "#FEFFFF"
      },
      {
        "code": "H3",
        "hex": "#B6B1BA"
      },
      {
        "code": "H4",
        "hex": "#89858C"
      },
      {
        "code": "H5",
        "hex": "#48464E"
      },
      {
        "code": "H6",
        "hex": "#2F2B2F"
      },
      {
        "code": "H7",
        "hex": "#000000"
      },
      {
        "code": "H8",
        "hex": "#E7D6DB"
      },
      {
        "code": "H9",
        "hex": "#EDEDED"
      },
      {
        "code": "H10",
        "hex": "#EEE9EA"
      },
      {
        "code": "H11",
        "hex": "#CECDD5"
      },
      {
        "code": "H12",
        "hex": "#FFF5ED"
      },
      {
        "code": "H13",
        "hex": "#F5ECD2"
      },
      {
        "code": "H14",
        "hex": "#CFD7D3"
      },
      {
        "code": "H15",
        "hex": "#98A6A8"
      },
      {
        "code": "H16",
        "hex": "#1D1414"
      },
      {
        "code": "H17",
        "hex": "#F1EDED"
      },
      {
        "code": "H18",
        "hex": "#FFFDF0"
      },
      {
        "code": "H19",
        "hex": "#F6EFE2"
      },
      {
        "code": "H20",
        "hex": "#949FA3"
      },
      {
        "code": "H21",
        "hex": "#FFFBE1"
      },
      {
        "code": "H22",
        "hex": "#CACAD4"
      },
      {
        "code": "H23",
        "hex": "#9A9D94"
      },
      {
        "code": "M1",
        "hex": "#BCC6B8"
      },
      {
        "code": "M2",
        "hex": "#8AA386"
      },
      {
        "code": "M3",
        "hex": "#697D80"
      },
      {
        "code": "M4",
        "hex": "#E3D2BC"
      },
      {
        "code": "M5",
        "hex": "#D0CCAA"
      },
      {
        "code": "M6",
        "hex": "#B0A782"
      },
      {
        "code": "M7",
        "hex": "#B4A497"
      },
      {
        "code": "M8",
        "hex": "#B38281"
      },
      {
        "code": "M9",
        "hex": "#A58767"
      },
      {
        "code": "M10",
        "hex": "#C5B2BC"
      },
      {
        "code": "M11",
        "hex": "#9F7594"
      },
      {
        "code": "M12",
        "hex": "#644749"
      },
      {
        "code": "M13",
        "hex": "#D19066"
      },
      {
        "code": "M14",
        "hex": "#C77362"
      },
      {
        "code": "M15",
        "hex": "#757D78"
      }
    ]
  },
  "mard-291": {
    "id": "mard-291",
    "label": "MARD 291",
    "diameter": 5,
    "colors": [
      {
        "code": "A1",
        "hex": "#FAF4C8"
      },
      {
        "code": "A2",
        "hex": "#FFFFD5"
      },
      {
        "code": "A3",
        "hex": "#FEFF8B"
      },
      {
        "code": "A4",
        "hex": "#FBED56"
      },
      {
        "code": "A5",
        "hex": "#F4D738"
      },
      {
        "code": "A6",
        "hex": "#FEAC4C"
      },
      {
        "code": "A7",
        "hex": "#FE8B4C"
      },
      {
        "code": "A8",
        "hex": "#FFDA45"
      },
      {
        "code": "A9",
        "hex": "#FF995B"
      },
      {
        "code": "A10",
        "hex": "#F77C31"
      },
      {
        "code": "A11",
        "hex": "#FFDD99"
      },
      {
        "code": "A12",
        "hex": "#FE9F72"
      },
      {
        "code": "A13",
        "hex": "#FFC365"
      },
      {
        "code": "A14",
        "hex": "#FD543D"
      },
      {
        "code": "A15",
        "hex": "#FFF365"
      },
      {
        "code": "A16",
        "hex": "#FFFF9F"
      },
      {
        "code": "A17",
        "hex": "#FFE36E"
      },
      {
        "code": "A18",
        "hex": "#FEBE7D"
      },
      {
        "code": "A19",
        "hex": "#FD7C72"
      },
      {
        "code": "A20",
        "hex": "#FFD568"
      },
      {
        "code": "A21",
        "hex": "#FFE395"
      },
      {
        "code": "A22",
        "hex": "#F4F57D"
      },
      {
        "code": "A23",
        "hex": "#E6C9B7"
      },
      {
        "code": "A24",
        "hex": "#F7F8A2"
      },
      {
        "code": "A25",
        "hex": "#FFD67D"
      },
      {
        "code": "A26",
        "hex": "#FFC830"
      },
      {
        "code": "B1",
        "hex": "#E6EE31"
      },
      {
        "code": "B2",
        "hex": "#63F347"
      },
      {
        "code": "B3",
        "hex": "#9EF780"
      },
      {
        "code": "B4",
        "hex": "#5DE035"
      },
      {
        "code": "B5",
        "hex": "#35E352"
      },
      {
        "code": "B6",
        "hex": "#65E2A6"
      },
      {
        "code": "B7",
        "hex": "#3DAF80"
      },
      {
        "code": "B8",
        "hex": "#1C9C4F"
      },
      {
        "code": "B9",
        "hex": "#27523A"
      },
      {
        "code": "B10",
        "hex": "#95D3C2"
      },
      {
        "code": "B11",
        "hex": "#5D722A"
      },
      {
        "code": "B12",
        "hex": "#166F41"
      },
      {
        "code": "B13",
        "hex": "#CAEB7B"
      },
      {
        "code": "B14",
        "hex": "#ADE946"
      },
      {
        "code": "B15",
        "hex": "#2E5132"
      },
      {
        "code": "B16",
        "hex": "#C5ED9C"
      },
      {
        "code": "B17",
        "hex": "#9BB13A"
      },
      {
        "code": "B18",
        "hex": "#E6EE49"
      },
      {
        "code": "B19",
        "hex": "#24B88C"
      },
      {
        "code": "B20",
        "hex": "#C2F0CC"
      },
      {
        "code": "B21",
        "hex": "#156A6B"
      },
      {
        "code": "B22",
        "hex": "#0B3C43"
      },
      {
        "code": "B23",
        "hex": "#303A21"
      },
      {
        "code": "B24",
        "hex": "#EEFCA5"
      },
      {
        "code": "B25",
        "hex": "#4E846D"
      },
      {
        "code": "B26",
        "hex": "#8D7A35"
      },
      {
        "code": "B27",
        "hex": "#CCE1AF"
      },
      {
        "code": "B28",
        "hex": "#9EE5B9"
      },
      {
        "code": "B29",
        "hex": "#C5E254"
      },
      {
        "code": "B30",
        "hex": "#E2FCB1"
      },
      {
        "code": "B31",
        "hex": "#B0E792"
      },
      {
        "code": "B32",
        "hex": "#9CAB5A"
      },
      {
        "code": "C1",
        "hex": "#E8FFE7"
      },
      {
        "code": "C2",
        "hex": "#A9F9FC"
      },
      {
        "code": "C3",
        "hex": "#A0E2FB"
      },
      {
        "code": "C4",
        "hex": "#41CCFF"
      },
      {
        "code": "C5",
        "hex": "#01ACEB"
      },
      {
        "code": "C6",
        "hex": "#50AAF0"
      },
      {
        "code": "C7",
        "hex": "#3677D2"
      },
      {
        "code": "C8",
        "hex": "#0F54C0"
      },
      {
        "code": "C9",
        "hex": "#324BCA"
      },
      {
        "code": "C10",
        "hex": "#3EBCE2"
      },
      {
        "code": "C11",
        "hex": "#28DDDE"
      },
      {
        "code": "C12",
        "hex": "#1C334D"
      },
      {
        "code": "C13",
        "hex": "#CDE8FF"
      },
      {
        "code": "C14",
        "hex": "#D5FDFF"
      },
      {
        "code": "C15",
        "hex": "#22C4C6"
      },
      {
        "code": "C16",
        "hex": "#1557A8"
      },
      {
        "code": "C17",
        "hex": "#04D1F6"
      },
      {
        "code": "C18",
        "hex": "#1D3344"
      },
      {
        "code": "C19",
        "hex": "#1887A2"
      },
      {
        "code": "C20",
        "hex": "#176DAF"
      },
      {
        "code": "C21",
        "hex": "#BEDDFF"
      },
      {
        "code": "C22",
        "hex": "#67B4BE"
      },
      {
        "code": "C23",
        "hex": "#C8E2FF"
      },
      {
        "code": "C24",
        "hex": "#7CC4FF"
      },
      {
        "code": "C25",
        "hex": "#A9E5E5"
      },
      {
        "code": "C26",
        "hex": "#3CAED8"
      },
      {
        "code": "C27",
        "hex": "#D3DFFA"
      },
      {
        "code": "C28",
        "hex": "#BBCFED"
      },
      {
        "code": "C29",
        "hex": "#34488E"
      },
      {
        "code": "D1",
        "hex": "#AEB4F2"
      },
      {
        "code": "D2",
        "hex": "#858EDD"
      },
      {
        "code": "D3",
        "hex": "#2F54AF"
      },
      {
        "code": "D4",
        "hex": "#182A84"
      },
      {
        "code": "D5",
        "hex": "#B843C5"
      },
      {
        "code": "D6",
        "hex": "#AC7BDE"
      },
      {
        "code": "D7",
        "hex": "#8854B3"
      },
      {
        "code": "D8",
        "hex": "#E2D3FF"
      },
      {
        "code": "D9",
        "hex": "#D5B9F8"
      },
      {
        "code": "D10",
        "hex": "#361851"
      },
      {
        "code": "D11",
        "hex": "#B9BAE1"
      },
      {
        "code": "D12",
        "hex": "#DE9AD4"
      },
      {
        "code": "D13",
        "hex": "#B90095"
      },
      {
        "code": "D14",
        "hex": "#8B279B"
      },
      {
        "code": "D15",
        "hex": "#2F1F90"
      },
      {
        "code": "D16",
        "hex": "#E3E1EE"
      },
      {
        "code": "D17",
        "hex": "#C4D4F6"
      },
      {
        "code": "D18",
        "hex": "#A45EC7"
      },
      {
        "code": "D19",
        "hex": "#D8C3D7"
      },
      {
        "code": "D20",
        "hex": "#9C32B2"
      },
      {
        "code": "D21",
        "hex": "#9A009B"
      },
      {
        "code": "D22",
        "hex": "#333A95"
      },
      {
        "code": "D23",
        "hex": "#EBDAFC"
      },
      {
        "code": "D24",
        "hex": "#7786E5"
      },
      {
        "code": "D25",
        "hex": "#494FC7"
      },
      {
        "code": "D26",
        "hex": "#DFC2F8"
      },
      {
        "code": "E1",
        "hex": "#FDD3CC"
      },
      {
        "code": "E2",
        "hex": "#FEC0DF"
      },
      {
        "code": "E3",
        "hex": "#FFB7E7"
      },
      {
        "code": "E4",
        "hex": "#E8649E"
      },
      {
        "code": "E5",
        "hex": "#F551A2"
      },
      {
        "code": "E6",
        "hex": "#F13D74"
      },
      {
        "code": "E7",
        "hex": "#C63478"
      },
      {
        "code": "E8",
        "hex": "#FFDBE9"
      },
      {
        "code": "E9",
        "hex": "#E970CC"
      },
      {
        "code": "E10",
        "hex": "#D33793"
      },
      {
        "code": "E11",
        "hex": "#FCDDD2"
      },
      {
        "code": "E12",
        "hex": "#F78FC3"
      },
      {
        "code": "E13",
        "hex": "#B5006D"
      },
      {
        "code": "E14",
        "hex": "#FFD1BA"
      },
      {
        "code": "E15",
        "hex": "#F8C7C9"
      },
      {
        "code": "E16",
        "hex": "#FFF3EB"
      },
      {
        "code": "E17",
        "hex": "#FFE2EA"
      },
      {
        "code": "E18",
        "hex": "#FFC7DB"
      },
      {
        "code": "E19",
        "hex": "#FEBAD5"
      },
      {
        "code": "E20",
        "hex": "#D8C7D1"
      },
      {
        "code": "E21",
        "hex": "#BD9DA1"
      },
      {
        "code": "E22",
        "hex": "#B785A1"
      },
      {
        "code": "E23",
        "hex": "#937A8D"
      },
      {
        "code": "E24",
        "hex": "#E1BCE8"
      },
      {
        "code": "F1",
        "hex": "#FD957B"
      },
      {
        "code": "F2",
        "hex": "#FC3D46"
      },
      {
        "code": "F3",
        "hex": "#F74941"
      },
      {
        "code": "F4",
        "hex": "#FC283C"
      },
      {
        "code": "F5",
        "hex": "#E7002F"
      },
      {
        "code": "F6",
        "hex": "#943630"
      },
      {
        "code": "F7",
        "hex": "#971937"
      },
      {
        "code": "F8",
        "hex": "#BC0028"
      },
      {
        "code": "F9",
        "hex": "#E2677A"
      },
      {
        "code": "F10",
        "hex": "#8A4526"
      },
      {
        "code": "F11",
        "hex": "#5A2121"
      },
      {
        "code": "F12",
        "hex": "#FD4E6A"
      },
      {
        "code": "F13",
        "hex": "#F35744"
      },
      {
        "code": "F14",
        "hex": "#FFA9AD"
      },
      {
        "code": "F15",
        "hex": "#D30022"
      },
      {
        "code": "F16",
        "hex": "#FEC2A6"
      },
      {
        "code": "F17",
        "hex": "#E69C79"
      },
      {
        "code": "F18",
        "hex": "#D37C46"
      },
      {
        "code": "F19",
        "hex": "#C1444A"
      },
      {
        "code": "F20",
        "hex": "#CD9391"
      },
      {
        "code": "F21",
        "hex": "#F7B4C6"
      },
      {
        "code": "F22",
        "hex": "#FDC0D0"
      },
      {
        "code": "F23",
        "hex": "#F67E66"
      },
      {
        "code": "F24",
        "hex": "#E698AA"
      },
      {
        "code": "F25",
        "hex": "#E54B4F"
      },
      {
        "code": "G1",
        "hex": "#FFE2CE"
      },
      {
        "code": "G2",
        "hex": "#FFC4AA"
      },
      {
        "code": "G3",
        "hex": "#F4C3A5"
      },
      {
        "code": "G4",
        "hex": "#E1B383"
      },
      {
        "code": "G5",
        "hex": "#EDB045"
      },
      {
        "code": "G6",
        "hex": "#E99C17"
      },
      {
        "code": "G7",
        "hex": "#9D5B3E"
      },
      {
        "code": "G8",
        "hex": "#753832"
      },
      {
        "code": "G9",
        "hex": "#E6B483"
      },
      {
        "code": "G10",
        "hex": "#D98C39"
      },
      {
        "code": "G11",
        "hex": "#E0C593"
      },
      {
        "code": "G12",
        "hex": "#FFC890"
      },
      {
        "code": "G13",
        "hex": "#B7714A"
      },
      {
        "code": "G14",
        "hex": "#8D614C"
      },
      {
        "code": "G15",
        "hex": "#FCF9E0"
      },
      {
        "code": "G16",
        "hex": "#F2D9BA"
      },
      {
        "code": "G17",
        "hex": "#78524B"
      },
      {
        "code": "G18",
        "hex": "#FFE4CC"
      },
      {
        "code": "G19",
        "hex": "#E07935"
      },
      {
        "code": "G20",
        "hex": "#A94023"
      },
      {
        "code": "G21",
        "hex": "#B88558"
      },
      {
        "code": "H1",
        "hex": "#FDFBFF"
      },
      {
        "code": "H2",
        "hex": "#FEFFFF"
      },
      {
        "code": "H3",
        "hex": "#B6B1BA"
      },
      {
        "code": "H4",
        "hex": "#89858C"
      },
      {
        "code": "H5",
        "hex": "#48464E"
      },
      {
        "code": "H6",
        "hex": "#2F2B2F"
      },
      {
        "code": "H7",
        "hex": "#000000"
      },
      {
        "code": "H8",
        "hex": "#E7D6DB"
      },
      {
        "code": "H9",
        "hex": "#EDEDED"
      },
      {
        "code": "H10",
        "hex": "#EEE9EA"
      },
      {
        "code": "H11",
        "hex": "#CECDD5"
      },
      {
        "code": "H12",
        "hex": "#FFF5ED"
      },
      {
        "code": "H13",
        "hex": "#F5ECD2"
      },
      {
        "code": "H14",
        "hex": "#CFD7D3"
      },
      {
        "code": "H15",
        "hex": "#98A6A8"
      },
      {
        "code": "H16",
        "hex": "#1D1414"
      },
      {
        "code": "H17",
        "hex": "#F1EDED"
      },
      {
        "code": "H18",
        "hex": "#FFFDF0"
      },
      {
        "code": "H19",
        "hex": "#F6EFE2"
      },
      {
        "code": "H20",
        "hex": "#949FA3"
      },
      {
        "code": "H21",
        "hex": "#FFFBE1"
      },
      {
        "code": "H22",
        "hex": "#CACAD4"
      },
      {
        "code": "H23",
        "hex": "#9A9D94"
      },
      {
        "code": "M1",
        "hex": "#BCC6B8"
      },
      {
        "code": "M2",
        "hex": "#8AA386"
      },
      {
        "code": "M3",
        "hex": "#697D80"
      },
      {
        "code": "M4",
        "hex": "#E3D2BC"
      },
      {
        "code": "M5",
        "hex": "#D0CCAA"
      },
      {
        "code": "M6",
        "hex": "#B0A782"
      },
      {
        "code": "M7",
        "hex": "#B4A497"
      },
      {
        "code": "M8",
        "hex": "#B38281"
      },
      {
        "code": "M9",
        "hex": "#A58767"
      },
      {
        "code": "M10",
        "hex": "#C5B2BC"
      },
      {
        "code": "M11",
        "hex": "#9F7594"
      },
      {
        "code": "M12",
        "hex": "#644749"
      },
      {
        "code": "M13",
        "hex": "#D19066"
      },
      {
        "code": "M14",
        "hex": "#C77362"
      },
      {
        "code": "M15",
        "hex": "#757D78"
      },
      {
        "code": "P1",
        "hex": "#FCF7F8"
      },
      {
        "code": "P2",
        "hex": "#B0A9AC"
      },
      {
        "code": "P3",
        "hex": "#AFDCAB"
      },
      {
        "code": "P4",
        "hex": "#FEA49F"
      },
      {
        "code": "P5",
        "hex": "#EE8C3E"
      },
      {
        "code": "P6",
        "hex": "#5FD0A7"
      },
      {
        "code": "P7",
        "hex": "#EB9270"
      },
      {
        "code": "P8",
        "hex": "#F0D958"
      },
      {
        "code": "P9",
        "hex": "#D9D9D9"
      },
      {
        "code": "P10",
        "hex": "#D9C7EA"
      },
      {
        "code": "P11",
        "hex": "#F3ECC9"
      },
      {
        "code": "P12",
        "hex": "#E6EEF2"
      },
      {
        "code": "P13",
        "hex": "#AACBEF"
      },
      {
        "code": "P14",
        "hex": "#337680"
      },
      {
        "code": "P15",
        "hex": "#668575"
      },
      {
        "code": "P16",
        "hex": "#FEBF45"
      },
      {
        "code": "P17",
        "hex": "#FEA324"
      },
      {
        "code": "P18",
        "hex": "#FEB89F"
      },
      {
        "code": "P19",
        "hex": "#FFFEEC"
      },
      {
        "code": "P20",
        "hex": "#FEBECF"
      },
      {
        "code": "P21",
        "hex": "#ECBEBF"
      },
      {
        "code": "P22",
        "hex": "#E4A89F"
      },
      {
        "code": "P23",
        "hex": "#A56268"
      },
      {
        "code": "Q1",
        "hex": "#F2A5E8"
      },
      {
        "code": "Q2",
        "hex": "#E9EC91"
      },
      {
        "code": "Q3",
        "hex": "#FFFF00"
      },
      {
        "code": "Q4",
        "hex": "#FFEBFA"
      },
      {
        "code": "Q5",
        "hex": "#76CEDE"
      },
      {
        "code": "R1",
        "hex": "#D50D21"
      },
      {
        "code": "R2",
        "hex": "#F92F83"
      },
      {
        "code": "R3",
        "hex": "#FD8324"
      },
      {
        "code": "R4",
        "hex": "#F8EC31"
      },
      {
        "code": "R5",
        "hex": "#35C75B"
      },
      {
        "code": "R6",
        "hex": "#238891"
      },
      {
        "code": "R7",
        "hex": "#19779D"
      },
      {
        "code": "R8",
        "hex": "#1A60C3"
      },
      {
        "code": "R9",
        "hex": "#9A56B4"
      },
      {
        "code": "R10",
        "hex": "#FFDB4C"
      },
      {
        "code": "R11",
        "hex": "#FFEBFA"
      },
      {
        "code": "R12",
        "hex": "#D8D5CE"
      },
      {
        "code": "R13",
        "hex": "#55514C"
      },
      {
        "code": "R14",
        "hex": "#9FE4DF"
      },
      {
        "code": "R15",
        "hex": "#77CEE9"
      },
      {
        "code": "R16",
        "hex": "#3ECFCA"
      },
      {
        "code": "R17",
        "hex": "#4A867A"
      },
      {
        "code": "R18",
        "hex": "#7FCD9D"
      },
      {
        "code": "R19",
        "hex": "#CDE55D"
      },
      {
        "code": "R20",
        "hex": "#E8C7B4"
      },
      {
        "code": "R21",
        "hex": "#AD6F3C"
      },
      {
        "code": "R22",
        "hex": "#6C372F"
      },
      {
        "code": "R23",
        "hex": "#FEB872"
      },
      {
        "code": "R24",
        "hex": "#F3C1C0"
      },
      {
        "code": "R25",
        "hex": "#C9675E"
      },
      {
        "code": "R26",
        "hex": "#D293BE"
      },
      {
        "code": "R27",
        "hex": "#EA8CB1"
      },
      {
        "code": "R28",
        "hex": "#9C87D6"
      },
      {
        "code": "T1",
        "hex": "#FFFFFF"
      },
      {
        "code": "Y1",
        "hex": "#FD6FB4"
      },
      {
        "code": "Y2",
        "hex": "#FEB481"
      },
      {
        "code": "Y3",
        "hex": "#D7FAA0"
      },
      {
        "code": "Y4",
        "hex": "#8BDBFA"
      },
      {
        "code": "Y5",
        "hex": "#E987EA"
      },
      {
        "code": "ZG1",
        "hex": "#DAABB3"
      },
      {
        "code": "ZG2",
        "hex": "#D6AA87"
      },
      {
        "code": "ZG3",
        "hex": "#C1BD8D"
      },
      {
        "code": "ZG4",
        "hex": "#96869F"
      },
      {
        "code": "ZG5",
        "hex": "#8490A6"
      },
      {
        "code": "ZG6",
        "hex": "#94BFE2"
      },
      {
        "code": "ZG7",
        "hex": "#E2A9D2"
      },
      {
        "code": "ZG8",
        "hex": "#AB91C0"
      }
    ]
  },
};

export const PALETTE_ORDER = ["mard", "mard-291", "coco", "artkal", "artkal-mini"];
