# 1. FriendlyEats-vue について

FriendlyEats-vueは、vueを使ったFirebase / Firestoreのチュートリアル用のアプリです。Firestoreを学習するために最小限のプログラムをするだけでFirestoreを使ったアプリケーションを作ることができます。
<img width="715" alt="sample.jpg" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/35cbad6f-5aa6-25aa-27db-dc9a3be00b75.jpeg">

このチュートリアルでは以下のことを学習します。
- WebアプリケーションからCloud Firestoreへの読み書きをする
- リアルタイムにCloud Firestoreのデータの変更を受け取る
- Firebaseのユーザ認証を使ったり、security rulesを使ってCloud Firestoreのデータを安全に読み書きする
- Cloud Firestoreの複雑なクエリーを書く

このチュートリアルを始めるに当たって、必要な開発環境は以下となります。

- Gitクライアント。GitHubのアカウントもあれば用意してください。
- Node.jsとnpm - Nodeはversion 8をお薦めします。
- IDEやテキストエディタ。どんなものでの良いですが、Emacs, vim, WebStorm, Atom, VS Code, Sublime などです。


# 2. Firebase projectの作成と設定

### Firebase projectを作成
1. Firebaseのコンソール上で, Add project をクリックし、Firebase projectの名前をFriendlyEatsと入力してください.
作成されたあなたの Firebase projectのProject IDは忘れないように！
1. Create projectをクリック！

> 重要: 作成された Firebase project はFriendlyEats という名前ですが、Firebaseは自動的に friendlyeats-1234のような固有のProject IDを割り当てます。この固有のIDは、あなたのプロジェクトを識別するのに必要です。(CLIなどで）。FriendlyEats は単にプロジェクトの名前です。

これから作成するアプリケーションは、web上でいくつかのFirebaseのサービスを利用します。

- Firebase Authentication - ユーザを簡単に管理/識別します
- Cloud Firestore - クラウド上に構造化されたデータを保存して、データが更新された時に即座に通知されます。
- Firebase Hosting - 静的なコンテンツを配信します

このチュートリアルでは、Firebase AuthおよびCloud Firestoreについては、Firebaseコンソールを使用してサービスの設定と有効化を順を追って説明します。

### Anonymous Auth (匿名認証)を有効にする

認証はこのチュートリアルの焦点ではありませんが、何らかの形式の認証を使用することは重要です。
このアプリでは、匿名ログインを使用します。つまり、ユーザーは何も意識することなくサイレントサインインします。
 
その為に、匿名ログインを有効にする必要があります。

1. Firebase consoleにおいて、左のナビゲーションメニューにDevelopのセクションがあります
1. Click Authenticationをクリックして、Sign-in method のタブをクリックします.
1. Anonymous Sign-in を有効にして保存(Save)をクリックします

![fee6c3ebdf904459.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/9c268b6e-a018-0566-8d49-0e8e2e76fe5f.png)

これでユーザーがWebアプリにアクセスするときに、サイレントサインインできるようになりました。詳細は、匿名認証のドキュメントをお読みください
 
### Cloud Firestoreを有効にする
このアプリは、レストランの情報や評価を保存、更新情報を受け取る為に、Cloud Firestoreを使います.

その為に、Cloud Firestoreを有効にする必要があります

1. Firebase consoleのDevelopセクションで, Databaseをクリックします.
1. Cloud Firestoreペインで「データベースを作成」をクリックします。
![8c5f57293d48652.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/4b85b657-394d-60ea-46f0-6e97615342f6.png)
1. オプションの「テストモードで開始する」を選択し、セキュリティルールに関する免責事項を読んだ後、「有効にする」をクリックします。

テストモードでは、開発中にデータベースに自由に書き込むことができます。このチュートリアルでは、後半にデータベース(Firestore)のセキュリティを強化します。

![620b95f93bdb154a.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/63f6c46d-a2fd-a149-4224-c408ec3e8b2f.png)


# 3. サンプルのソースコード取得とインストール

### ソースコードの取得
以下のコマンドを使って GitHub レポジトリをクローンします

```
git clone https://github.com/isamu/FriendlyEats-vue
```
* 自分の変更をGitHubで管理したい場合には、Forkしてcloneしてください


サンプルコードは📁FriendlyEats-vueディレクトリにCloneする必要があります。
以後、このディレクトリ内でコマンドラインを実行してください。


```
cd FriendlyEats-vue
```

### npmのインストール

npmのパッケージをインストールします。

```
npm install
```
### Firebase の設定取得と書き換え

Firebaseの設定をコンソールから取得して、src/firebase/firebase.js に設定をコピーします。

- firebase console (from https://firebase.google.com) を開いてprojectを追加.
- このプロジェクトのダッシュボードで「add app」をクリック、 "web" (</>)を選択.
- このアプリの設定画面のGeneralタブの Firebase SDK snippetに置いて"Config" を選択
- `const firebase` で始まる設定をコピーして、ソースコードのsrc/firebase/firebase.jsにコピーする.  

### スターターアプリをインポートする

IDE（WebStorm、Atom、Sublime、Visual Studio Code ...）を使用している場合、📁FriendlyEats-vueディレクトリを開くかインポートします。このディレクトリには、これから実装するレストラン情報と、オススメ情報を表示するアプリのチュートリアルのモックコードが含まれています。このチュートリアルを機能するように、そのディレクトリのコードを実装していく必要があります。


# 4. Firebase CLI (コマンドラインツール)のインストール


Firebaseコマンドラインインターフェイス（CLI）を使用すると、Webアプリをローカルで開発したり、Firebase Hostingにデプロイすることができます。

Note: CLIをインストールするには、通常NodeJSに付属しているnpmをインストールする必要があります。

1 . 次のnpmコマンドを実行して、CLIをインストールします。

```
npm -g install firebase-tools
```

> 動作しませんか？ npmのpermissionを変更する必要がある場合があります。

2 . 次のコマンドを実行して、CLIが正しくインストールされたことを確認します。

```
firebase --version
```

Firebase CLIのバージョンがv6.2.0以降であることを確認してください。

3 . 次のコマンドを実行して、Firebase CLIを認証します。

```
firebase login
```

Firebase Hostingのアプリの設定をアプリのローカルディレクトリとファイルから取得するように、ウェブアプリテンプレートを設定しました。ただし、これを行うには、アプリをFirebaseプロジェクトに関連付ける必要があります。


4 . コマンドラインが、先ほどcloneしたディレクトリーになっているか確認してください（通常FriendlyEats-vueディレクトリー。pwdで現在のディレクトリーを確認できます）

5 . 次のコマンドを実行して、アプリをFirebaseプロジェクトに関連付けます。

```
firebase use --add
```

6 . プロンプトが表示されたら、プロジェクトIDを選択し、Firebaseプロジェクトにエイリアスを指定します。
エイリアスは、複数の環境（本番、ステージングなど）がある場合に役立ちます。ただし、このチュートリアルでは、デフォルトのエイリアスのみを使用します。

7 . コマンドラインの残りの指示に従ってください。

# 5. vueをローカルで起動する
アプリで実際に作業を開始する準備ができました！アプリをローカルで実行しましょう！

1 . 次のコマンドをローカルのCLIで実行します:

```
npm run serve
```

2 . 成功すると次の文を含むメッセージが表示されます

```
  - Local:   http://localhost:8080/ 
```

vueサーバがローカルで起動しています。 ブラウザ http://localhost:8080 を開くとサンプルアプリを見ることができます。 vueを起動すると自動的に開く場合もあります。8080という数字は少し別の番号になっている場合もあります。

3 . ブラウザで http://localhost:8080 を見る

クラウド上のFirebaseプロジェクトに接続されているFriendlyEatsアプリが表示されます。

アプリは自動的にクラウド上のFirebaseプロジェクトに接続し、匿名ユーザーとしてサインインしました。

<img width="771" alt="スクリーンショット 2019-08-03 4.28.16.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/e20ecc4f-34a1-9044-f0f9-73913dff3a43.png">


# 6. Cloud Firestoreへデータの書き込み

このセクションでは、Cloud Firestoreにデータを書き込みます。Firebaseコンソール上で手動でデータ入力を行うこともできますが、Cloud Firestoreの基本的な書き込みを学習する為に、アプリ自体でデータ生成/入力を行います。


### データモデル

Firestoreデータは、コレクション、ドキュメント、フィールド、およびサブコレクションで構成されています。各レストラン情報をドキュメントとして、restaurantと呼ばれる最上位のコレクションに保存します。

![6010184d388a897.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/d45258ad-7389-7cc4-60ec-98f218f1a9a5.png)


そして、各レストランのレビューをratingと名付けたサブコレクションに保存します。

![7d949c3471e49573.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/a94dc013-8ea3-8b84-a074-a730ad75da76.png)


> Tip: Firestoreデータモデルの詳細については、ドキュメントのドキュメントとコレクションをご覧ください。

### Firestoreにレストラン情報を追加する

このアプリの主なモデルオブジェクトはrestaurantです。restaurantsコレクションにレストランのドキュメントを追加するコードを書きましょう。

1. cloneしたソースコードの src/components/FriendlyEats.Data.js ファイルを開く.
1. addRestaurant 関数を探す.
1. 関数全体を以下のコードに置き換える

[FriendlyEats.Data.js](https://github.com/isamu/FriendlyEats-vue/blob/master/src/components/FriendlyEats.Data.js#L4-L8.js)

```
export const addRestaurant = (data) => {
  const collection = firebase.firestore().collection('restaurants');
  return collection.add(data);
};
```

上記のコードにより、restaurantsコレクションに新しいドキュメント(データ)が追加されます。ドキュメントのデータはJavaScriptオブジェクトです。

1. まずこの関数はレストランのデータを引数として取得し、
1. 次にCloud Firestoreのrestaurantsコレクションへの参照を取得
1. 最後にデータを追加

という処理をします。

(* 実際にどのようにデータが生成されるか興味がある人はsrc/FriendlyEats/FriendlyEats.Mock.js のaddMockRestaurantsとgetRandomRestaurantの関数を見てください。)

### restaurants情報を追加しよう!

1. ブラウザのFriendlyEatsアプリに戻り、画面を更新しましょう
1. 「Add Mock Data」をクリック.

アプリはレストランオブジェクトをランダムに自動生成し、addRestaurant関数を呼び出します。
ただし、データの取得（このチュートリアルの次のセクション）を実装する必要があるため、実際のWebアプリにはまだデータは表示されません。

ただし、Firebaseコンソールの「Cloud Firestore」タブに移動すると、restaurantsコレクションに新しいドキュメントが表示されます。

![f06898b9d6dd4881.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/cff76203-d553-b523-5f01-7e129f792c2e.png)


おめでとうございます！！WebアプリからCloud Firestoreにデータを書き込みが成功しました！！


次のセクションでは、Cloud Firestoreからデータを取得してアプリに表示する方法を学習します。


# 7. Cloud Firestore のデータを表示


このセクションでは、Cloud Firestoreからデータを取得してアプリに表示する方法を学習します。 2つの重要な手順は、クエリの作成とスナップショットリスナーの追加です。このリスナーには、クエリに一致するすべての既存データが通知され、更新をリアルタイムで受信します。

最初に、レストランのデフォルトのフィルタリングされていないリストを提供するクエリを作成しましょう。

1. src/components/FriendlyEats.Data.js ファイルを開きます
1. getAllRestaurants 関数を探します
1. 関数全体を以下のコードに置き換えます


[FriendlyEats.Data.js](https://github.com/isamu/FriendlyEats-vue/blob/master/src/components/FriendlyEats.Data.js#L10-L14.js)

```
export const getAllRestaurants = () => {
  const query = firebase.firestore()
        .collection('restaurants')
        .orderBy('avgRating', 'desc')
        .limit(50);

  return query;
};
```

上記のコードでは、restaurantsという名のトップレベルコレクションから最大50件のレストランを取得するクエリを作成しています。これらは評価の平均順（現在はすべてゼロ）に並べられています。このクエリを定義後、データの読み込みとレンダリングを行うgetDocumentsInQuery（）関数にこのクエリを渡します.

これを行うには、スナップショットリスナーを追加します。


- src/components/FriendlyEats.Data.js を開く
- getDocumentsInQuery 関数を探す
- 関数全体を以下のコードに置き換える

[FriendlyEats.Data.js](https://github.com/isamu/FriendlyEats-vue/blob/master/src/components/FriendlyEats.Data.js#L16-L20.js)

```
export const getDocumentsInQuery = (query, renderer) => {
  return query.onSnapshot((snapshot) => {
    if (!snapshot.size) return renderer.empty();

    snapshot.docChanges().forEach((change) => {
      if (change.type === 'removed') {
        renderer.remove(change.doc)
      } else {
        renderer.display(change.doc)
      }
    });
  });
};
```

上記のコードでは、クエリの結果に変更があるたびにquery.onSnapshotをコールバックで呼び出します。

- 最初のコールバックは、クエリの結果、全体のデータをsnapshotとして渡します。これは、Cloud Firestoreのrestaurantsコレクション全体(50件)を意味します。そしてchangeには、全ての個々のドキュメントが渡され、それをrenderer.display関数に渡します。
- ドキュメントが削除された時には、change.typeはremovedとなります。したがって、この場合、UIからレストランを削除する関数を呼び出します。

両方のメソッドを実装したので、アプリを更新し、Firebaseコンソールで前に表示したレストラン情報がWebアプリに表示されていることを確認します。このセクションを正常に完了した場合、WebアプリはCloud Firestoreでデータを読み書きできています。

レストランのリストが変更されると、このリスナーは自動的にデータを更新します。
Firebaseコンソールに移動して、レストランを手動で削除するか、名前を変更してみてください。サイト上のデータも更新されます。


Note: リアルタイムの更新をリッスンするのではなく、Query.get（）メソッドを使用してCloud Firestoreからドキュメントを一度だけ取得することもできます。

> # <img width="715" alt="sample.jpg" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/2617ae53-c393-f062-e018-410a9f23f8ed.jpeg">

# 8. データを取得する

今までは、onSnapshotを使用して更新をリアルタイムで取得する方法を実装しました。
しかし、それは常に私たちが望む方法ではありません。データを一度だけフェッチする方が理にかなっている場合があります。

ユーザーがアプリ内の特定のレストランをクリックしたときにトリガーされるメソッドを実装する必要があります。

1. src/components/FriendlyEats.Data.js を開く
1. getRestaurant関数を探す
1. 関数全体を以下のコードに置き換えます

[FriendlyEats.Data.js](https://github.com/isamu/FriendlyEats-vue/blob/master/src/components/FriendlyEats.Data.js#L22-L26.js)

```
export const getRestaurant = (id) => {
  return firebase.firestore().collection('restaurants').doc(id).get();
};
```

このメソッドを実装すると、各レストランのページを表示できるようになります。リスト内のレストランをクリックするだけで、レストランの詳細ページが表示されます。

<img width="549" alt="スクリーンショット 2019-08-03 4.32.01.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/25071/3c2a3b4d-1da8-4cff-f9b2-e44ee0e305f9.png">



現時点では、チュートリアルの後半で評価の追加を実装するため、評価を追加することはできません。


# 9. データのソートと絞り込み

現在、アプリにはレストランのリストが表示されていますが、ユーザーがニーズに基づいてフィルタリングする方法はありません。このセクションでは、Cloud Firestoreの高度なクエリを使用してフィルタリングを有効にします。

すべての「点心」レストランを取得する簡単なクエリの例を次に示します。


```
var filteredQuery = query.where('category', '==', 'Dim Sum')
```

その名前が示すように、where（）メソッドは、条件に一致するフィールドを持つコレクション内のドキュメントを取得します。この場合、カテゴリが「点心」のレストランのみを取得しています

このアプリでは、ユーザーは複数のフィルターをチェーンして、「サンフランシスコのピザ」や「人気のあるロサンゼルスのシーフード」などの特定のクエリを作成できます。

ユーザーが選択した複数の条件に基づいてレストランをフィルタリングするクエリを作成するメソッドを作成します。


1. src/components/FriendlyEats.Data.js を開く
1. getFilteredRestaurantsを探す
1. 関数全体を以下のコードに置き換えます

[FriendlyEats.Data.js](https://github.com/isamu/FriendlyEats-vue/blob/master/src/components/FriendlyEats.Data.js#L28-L32.js)

```
export const getFilteredRestaurants = (filters) => {
  let query = firebase.firestore().collection('restaurants');

  if (filters.category !== 'Any') {
    query = query.where('category', '==', filters.category);
  }

  if (filters.city !== 'Any') {
    query = query.where('city', '==', filters.city);
  }

  if (filters.price !== 'Any') {
    query = query.where('price', '==', filters.price.length);
  }

  if (filters.sort === 'Rating') {
    query = query.orderBy('avgRating', 'desc');
  } else if (filters.sort === 'Reviews') {
    query = query.orderBy('numRatings', 'desc');
  }
  return query;
};
```

上記のコードは、複数のwhereフィルターと1つのorderByを追加して、ユーザー入力に基づいて複合クエリを作成します。このクエリは、ユーザーの要件に一致するレストランのみを返します。

ブラウザでFriendlyEatsアプリを更新し、価格、都市、カテゴリでフィルタリングできることを確認します。テスト中に、ブラウザのJavaScriptコンソールに次のようなエラーが表示されます。

```
The query requires an index. You can create it here: https://console.firebase.google.com/project/.../database/firestore/indexes?create_index=...
```

これらのエラーは、Cloud Firestoreでほとんどの複合クエリにインデックスが必要なためです。クエリのインデックスを必要とすることで、Cloud Firestoreを大規模に高速に保ちます。

エラーメッセージからリンクを開くと、正しいパラメーターが入力されたFirebaseコンソールでインデックス作成UIが自動的に開きます。次のセクションでは、このアプリケーションに必要なインデックスを作成してデプロイします。

# 10. Cloud Firestoreへindexの追加

アプリ内のすべてのパスを探索し、各インデックス作成リンクをたどる必要がない場合は、Firebase CLIを使用して多数のインデックスを一度に簡単に展開できます。

1. アプリのダウンロードしたローカルディレクトリに、firestore.indexes.jsonファイルがあります。

このファイルには、フィルターのすべての可能な組み合わせに必要なすべてのインデックスが記述されています。

[firestore.indexes.json](https://github.com/isamu/FriendlyEats-vue/blob/master/firestore.indexes.json)

```
{
 "indexes": [
   {
     "collectionGroup": "restaurants",
     "queryScope": "COLLECTION",
     "fields": [
       { "fieldPath": "city", "order": "ASCENDING" },
       { "fieldPath": "avgRating", "order": "DESCENDING" }
     ]
   },

   ...

 ]
}
```

次のコマンドでこれらのインデックスをデプロイします。

```
firebase deploy --only firestore:indexes
```
数分後、インデックスが有効になり、エラーメッセージが消えます。


> Tip: Cloud Firestoreのインデックスの詳細については、ドキュメントをご覧ください。

# 11. トランザクションを使ってデータの書き込み
このセクションでは、ユーザーがレストランにレビューを書き込みきる機能を追加します。
これまでのところ、すべての書き込みはアトミックで比較的単純です。それらのいずれかにエラーが発生した場合、ユーザーにそれらを再試行するように促すか、アプリが書き込みを自動的に再試行する可能性があります。

このアプリには、レストランの評価を追加するユーザーが多数いるため、複数の読み取りと書き込みを調整する必要があります。最初にレビュー自体を提出する必要があり、次にレストランの評価数と平均評価を更新する必要があります。これらの1つが失敗し、もう1つが失敗した場合、データベースのある部分のデータが別の部分のデータと一致しない矛盾した状態になります。

幸いなことに、Cloud Firestoreには、単一のアトミック操作で複数の読み取りと書き込みを実行できるトランザクション機能が用意されており、データの一貫性を維持できます。

1. src/components/FriendlyEats.Data.js を開く
1. addRating 関数を探す
1. 関数全体を以下のコードに置き換えます

[FriendlyEats.Data.js](https://github.com/isamu/FriendlyEats-vue/blob/master/src/components/FriendlyEats.Data.js#L34-L38.js)

```
export const addRating = (restaurantID, rating) => {
  const collection = firebase.firestore().collection('restaurants');
  const document = collection.doc(restaurantID);
  const newRatingDocument = document.collection('ratings').doc();

  return firebase.firestore().runTransaction(function(transaction) {
    return transaction.get(document).then(function(doc) {
      const data = doc.data();

      const newAverage =
            (data.numRatings * data.avgRating + rating.rating) /
            (data.numRatings + 1);

      transaction.update(document, {
        numRatings: data.numRatings + 1,
        avgRating: newAverage
      });
      return transaction.set(newRatingDocument, rating);
    });
  });
};
```


上記のブロックでは、レストランドキュメントのaverageRatingとratingCountの数値を更新するトランザクションを呼び出します。同時に、レーティングサブコレクションに新しいレーティングを追加します。

>注：評価を追加することは、このチュートリアルでトランザクションを使用する良い例です。ただし、運用アプリでは、ユーザーによる操作を回避するために、信頼できるサーバーで平均評価計算を実行する必要があります。これを行う良い方法は、クライアントから直接評価ドキュメントを作成し、Cloud Functionsを使用して新しいレストランの平均評価を更新することです。

>警告：サーバーでトランザクションが失敗すると、コールバックも繰り返し再実行されます。アプリの状態を変更するロジックをトランザクションコールバック内に配置しないでください。

# 12. データを守る

このチュートリアルの最初に、アプリのセキュリティルールをテストモードに設定して、自由に読み書きできるように設定しました。
実際のアプリケーションでは、望ましくないデータの読み込みや変更を防ぐために、よりきめ細かいルールを設定する必要があります。

Firebase consoleにおいてDevelopセクションのDatabaseをクリックします。
Cloud Firestore sectionのRules tabをクリックします。

defaultsを次のルールに書き換えて、Publishをクリックします。

[firestore.rules](https://github.com/isamu/FriendlyEats-vue/blob/master/firestore.rules)

```
service cloud.firestore {
  match /databases/{database}/documents {

        // Restaurants:
        //   - Authenticated user can read
        //   - Authenticated user can create/update (for demo)
        //   - Validate updates
        //   - Deletes are not allowed
    match /restaurants/{restaurantId} {
      allow read, create: if request.auth != null;
      allow update: if request.auth != null
                    && request.resource.data.name == resource.data.name
      allow delete: if false;
      
      // Ratings:
      //   - Authenticated user can read
      //   - Authenticated user can create if userId matches
      //   - Deletes and updates are not allowed
      match /ratings/{ratingId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null
                      && request.resource.data.userId == request.auth.uid;
        allow update, delete: if false;
        
        }
    }
  }
}
```

これらのルールはアクセスを制限して、クライアントが安全な変更のみを行うようにします。例えば：

- レストランのドキュメントを更新すると、評価のみが変更され、名前やその他の不変データは変更されません。
- ユーザーIDがサインインしているユーザーと一致する場合にのみ評価を作成できます。これにより、なりすましが防止されます。

Firebaseコンソールを使用する代わりに、Firebase CLIを使用してルールをFirebaseプロジェクトに展開できます。作業ディレクトリのfirestore.rulesファイルには、上記のルールが既に含まれています。 （Firebaseコンソールを使用するのではなく）ローカルファイルシステムからこれらのルールを展開するには、次のコマンドを実行します。


```
firebase deploy --only firestore:rules
```

重要：セキュリティルールの詳細については、セキュリティルールのドキュメントをご覧ください。

# 13. デプロイ

vueをビルドします

```
npm run build
```

build/以下に静的なファイルが生成されます。

Cloud Firebaseへデプロイします。

```
firebase deploy --only hosting
```

以下のように表示されるとデプロイ成功です。
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/friendlyeats-vue/overview
Hosting URL: https://friendlyeats-vue.firebaseapp.com
```

Hosting URLをブラウザで見てみましょう。作成したアプリケーションが見えます！

# 14. まとめ
このチュートリアルでは、Cloud Firestoreで基本および高度な読み取りと書き込みを実行する方法と、セキュリティルールでデータアクセスを保護する方法を学びました。完全なソリューションは[development]（https://github.com/isamu/FriendlyEats-vue/tree/developmentht）リポジトリで見つけることができます。

Cloud Firestoreの詳細については、次のリソースをご覧ください:

- [Introduction to Cloud Firestore](https://firebase.google.com/docs/firestore/)
- [Choosing a Data Structure](https://firebase.google.com/docs/firestore/manage-data/structure-data)
- [Cloud Firestore Web Samples](https://firebase.google.com/docs/firestore/client/samples-web)

