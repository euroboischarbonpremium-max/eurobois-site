const PRODUCTS = {
  "bois-chene-1m3": {
    "id": "bois-chene-1m3",
    "name": "Bois de chêne sec – 1 m³",
    "price": 129.0,
    "image": "images/bois-chene-1m3.jpg",
    "cat": "firewood",
    "title": "prod.oak1.title",
    "desc": "prod.oak1.desc",
    "reviews": 124
  },
  "bois-hetre-2m3": {
    "id": "bois-hetre-2m3",
    "name": "Bois de hêtre sec – 2 m³",
    "price": 219.0,
    "image": "images/bois-hetre-2m3.jpg",
    "cat": "firewood",
    "title": "prod.beech2.title",
    "desc": "prod.beech2.desc",
    "reviews": 98
  },
  "bois-charme-2m3": {
    "id": "bois-charme-2m3",
    "name": "Bois de charme sec – 2 m³",
    "price": 199.0,
    "image": "images/bois-charme-2m3.jpg",
    "cat": "firewood",
    "title": "prod.hornbeam2.title",
    "desc": "prod.hornbeam2.desc",
    "reviews": 76
  },
  "bois-chene-2m3": {
    "id": "bois-chene-2m3",
    "name": "Bois de chêne sec – 2 m³",
    "price": 248.0,
    "image": "images/bois-chene-2m3.jpg",
    "cat": "firewood",
    "title": "prod.oak2.title",
    "desc": "prod.oak2.desc",
    "reviews": 112
  },
  "bois-bouleau-05": {
    "id": "bois-bouleau-05",
    "name": "Bois de bouleau sec - 0,5 m³",
    "price": 132.99,
    "image": "images/bois-bouleau.jpg",
    "cat": "firewood",
    "title": "prod.birch05.title",
    "desc": "prod.birch05.desc",
    "reviews": 55
  },
  "bois-bouleau-1m3": {
    "id": "bois-bouleau-1m3",
    "name": "Bois de bouleau sec - 1 m³",
    "price": 220.0,
    "image": "images/bois-bouleau.jpg",
    "cat": "firewood",
    "title": "prod.birch1.title",
    "desc": "prod.birch1.desc",
    "reviews": 72
  },
  "charbon-20kg": {
    "id": "charbon-20kg",
    "name": "Charbon de bois - 20 kg",
    "price": 37.89,
    "image": "images/charbon-bois-10kg.jpg",
    "cat": "charcoal",
    "title": "prod.charcoal10.title",
    "desc": "prod.charcoal10.desc",
    "reviews": 98
  },
  "granules-15kg": {
    "id": "granules-15kg",
    "name": "Granulés de bois - 15 kg",
    "price": 6.9,
    "image": "images/granules-bois-15kg.jpg",
    "cat": "pellets",
    "title": "prod.pellets15.title",
    "desc": "prod.pellets15.desc",
    "reviews": 64
  },
  "granules-120kg": {
    "id": "granules-120kg",
    "name": "Granulés de bois - 120 kg",
    "price": 37.9,
    "image": "images/granules-bois-120kg.jpg",
    "cat": "pellets",
    "title": "prod.pellets120.title",
    "desc": "prod.pellets120.desc",
    "reviews": 48
  },
  "buches-densifiees-10kg": {
    "id": "buches-densifiees-10kg",
    "name": "Bûches densifiées - 10 kg",
    "price": 7.9,
    "image": "images/buches-densifiees-10kg.jpg",
    "cat": "logs",
    "title": "prod.densified10.title",
    "desc": "prod.densified10.desc",
    "reviews": 76
  },
  "allume-feu-32": {
    "id": "allume-feu-32",
    "name": "Allume-feu naturel - 32 cubes",
    "price": 4.8,
    "image": "images/allume-feu-32cubes-new.jpg",
    "cat": "other",
    "title": "prod.firestarter32.title",
    "desc": "prod.firestarter32.desc",
    "reviews": 41
  },
  "briq-10kg": {
    "id": "briq-10kg",
    "name": "Briquettes de bois - 10 kg",
    "price": 7.0,
    "image": "images/briquettes-bois.jpg",
    "cat": "logs",
    "title": "prod.briq10.title",
    "desc": "prod.briq10.desc",
    "reviews": 28
  },
  "briq-240kg": {
    "id": "briq-240kg",
    "name": "Briquettes de bois - ¼ palette 240 kg",
    "price": 149.0,
    "image": "images/briquettes-bois.jpg",
    "cat": "logs",
    "title": "prod.briq240.title",
    "desc": "prod.briq240.desc",
    "reviews": 45
  },
  "briq-480kg": {
    "id": "briq-480kg",
    "name": "Briquettes de bois - ½ palette 480 kg",
    "price": 289.89,
    "image": "images/briquettes-bois.jpg",
    "cat": "logs",
    "title": "prod.briq480.title",
    "desc": "prod.briq480.desc",
    "reviews": 52
  },
  "briq-720kg": {
    "id": "briq-720kg",
    "name": "Briquettes de bois - ¾ palette 720 kg",
    "price": 439.0,
    "image": "images/briquettes-bois.jpg",
    "cat": "logs",
    "title": "prod.briq720.title",
    "desc": "prod.briq720.desc",
    "reviews": 31
  },
  "briq-960kg": {
    "id": "briq-960kg",
    "name": "Briquettes de bois - palette 960 kg",
    "price": 519.0,
    "image": "images/briquettes-bois.jpg",
    "cat": "logs",
    "title": "prod.briq960.title",
    "desc": "prod.briq960.desc",
    "reviews": 67
  },
  "charbon-10kg": {
    "id": "charbon-10kg",
    "name": "Charbon de bois - 10 kg",
    "price": 18.9,
    "oldPrice": 25.9,
    "image": "images/charbon-naturcoal-10kg.jpg",
    "cat": "charcoal",
    "title": "prod.charcoal.title",
    "desc": "prod.charcoal.long",
    "reviews": 98
  }
};
