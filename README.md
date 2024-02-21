Preview APK може да бъде свалено от следния адрес: https://expo.dev/accounts/stoianp/projects/secure-app-expo/builds/17913b83-7ccd-4bbe-b5e8-1f119115876c

Първо проверява дали устройството е rooted/jailbroken, ако всичко е наред изисква google signin чрез кликване на гугълския бутон.
ToDo: след като е логнат с гугъл взема или проверява за валидност токън, който е запазен в secure storage - стъпката все още не съм я реализирал, тъйкато документацията е оскъдна и имам нужда от още четене по темата
Ако при следващо стартиране потребителят вече е логнат с гугълски акаунт - изисква пръстов отпечатък или PIN код.

Реализирал съм стъпките като отделни компоненти - не съм сигурен дали това е правилният подход в случая.

Ползвам библиотеките на Expo - поддържат се от голяма общност и са с MIT лиценз.
@react-native-google-signin/google-signin - за аутентикация с гугъл, като включва и нейтив код - https://docs.expo.dev/guides/google-authentication/
expo-device - за проверка дали устройството е rooted/jailbroken - още е експериментална - пише, че има вероятност да даде, че дадено андроид устройство може да е рутнато, а то да не е - https://docs.expo.dev/versions/latest/sdk/device/#deviceisrootedexperimentalasync
expo-local-authentication - за fingerprint или PIN/Password логване - https://docs.expo.dev/versions/latest/sdk/local-authentication/

За да се стартира в дебъг - след смъкване на репозиторито трябва да се изпълнят следните стъпки:
npm install - зарежда всички dependencies
npx expo prebuild --clean - включва нейтив кода в проекта
eas build --profile development --platform android - създава development apk, което трябва да се зареди в емулатора или тест утройството, може да се свали от следния адрес: https://expo.dev/accounts/stoianp/projects/secure-app-expo/builds/96531c66-5d34-440c-85be-55079709ca55
След като development apk е заредено, проектът се стартира с
npm start