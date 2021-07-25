import 'package:get/get_navigation/get_navigation.dart';
import 'package:web_sa_transportes/pages/home/home.page.dart';
import 'package:web_sa_transportes/pages/home/home_binding.dart';
import 'package:web_sa_transportes/pages/login/login.page.dart';
import 'package:web_sa_transportes/pages/login/login_binding.dart';

part 'app_routes.dart';

// ignore: avoid_classes_with_only_static_members
class AppPages {
  static const INITIAL = Routes.LOGIN;

  static final routes = [
    GetPage(
      name: Routes.LOGIN,
      page: () => LoginPage(),
      binding: LoginBinding(),
      /*children: [
          GetPage(
            name: Routes.COUNTRY,
            page: () => CountryView(),
            children: [
              GetPage(
                name: Routes.DETAILS,
                page: () => DetailsView(),
              ),
            ],
          ),
        ]*/
    ),
    GetPage(
      name: Routes.HOME,
      page: () => HomePage(),
      binding: HomeBinding(),
      /*children: [
          GetPage(
            name: Routes.COUNTRY,
            page: () => CountryView(),
            children: [
              GetPage(
                name: Routes.DETAILS,
                page: () => DetailsView(),
              ),
            ],
          ),
        ]*/
    ),
  ];
}