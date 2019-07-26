<template>
<v-layout  row wrap>
  <v-flex xs4 v-for="(restaurant, index) in restaurants" :key="index">
    <v-card>
      <img :src="restaurant.photo" /><br/>
      {{restaurant.name}}<br/>
      {{restaurant.city}}
    </v-card>
  </v-flex>
  
</v-layout>
</template>

<script>
export default {
  name: 'Top',
  data() {
    const restaurants = [];
    for(var i = 0; i < 20; i ++ ) {
      restaurants.push(this.rand());
    }

    return {
      restaurants
    };
  },
  methods: {
    rand: function() {
      const name = [
        "ビストロ",
        "割烹",
        "居酒屋",
        "串焼き",
        "パティスリー",
        "バー",
        "洋食屋",
        "和食",
        "食堂",
        "たこ焼き",
        "究極のかき氷",
        "驚異のアンパン",
        "オリエンタル料理",
      ];
      const name2 = [
        "ボンジュール",
        "ナポリ",
        "プルミエ",
        "クオモ",
        "えびすや",
        "おかみ",
        "あざみ",
        "銀座",
        "東京",
        "山田",
        "アトム",
        "まるはち",
        "ボンボン",
        "摩天楼",
        "モンシュー",
        "魔の巣",
        "アウトサイダー",
      ];
      const categories = ["和食", "洋食", "スイーツ"];
      const cities = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
                      "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
                      "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
                      "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
                      "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
                      "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
                      "熊本県","大分県","宮崎県","鹿児島県","沖縄県"];
      const category = this.getRandomItem(categories);
      const city = this.getRandomItem(cities);
      const price = Math.floor(Math.random() * 4) + 1;
      const photoID = Math.floor(Math.random() * 22) + 1;
      const photo = 'https://storage.googleapis.com/firestorequickstarts.appspot.com/food_' + photoID + '.png';

      return {
        price,
        photo,
        city,
        name: this.getRandomItem(name) + " " + this.getRandomItem(name2),
      };
      
    },
    getRandomItem: function(items) {
      return items[Math.floor(Math.random()*items.length)];
    }
  }

}
</script>
