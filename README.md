# OnePercentClub

This repository contains the source code for a financial application developed for the Onepercentclub assignment. The app utilizes a Real-Time Finance API to provide users with up-to-date market data.

Api Link - https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-finance-data/playground/apiendpoint_44e4b37f-1462-4c25-85ac-9da3511e6454

> **Note**: As the above api has some restrictions, i have used dummy data as a fallback.

## Features:

```bash
1.App Name with app Icon
2.Splash Screen
3.Login (using redux)
4.Home Screen
 a.Lists all stocks (Redux)
 b.Search a stock by stock name
 c.Pagination enabled
 Note : HomeScreen has a bottom sheet as shown in figma.
5.On Long pressing the stock card, show description of the stock
6.On Click of the stock card, stock detail page opens which shows all the details of the stock.
7.StockDetails Screen has all details of stock
8.Add to Order takes you to the orders page, here all orders are listed using redux.
9.You can delete any order or place an order.
10.Swipe to Buy Button makes the purchase.
11.Push Notification is sent after succesfull purchase.
```

## Technology Stack:

```bash
React-Native, JavaScript, Redux-Toolkit, Notifee
```

## Getting Started

## Step 1.Clone this repository:

git clone git@github.com:Ashishpal438/OnePercentClub.git

## Step 2.Install dependencies:

```bash
# using npm
npm install

# OR using Yarn
yarn install

# install Pods
cd ios/
pod install
```

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
