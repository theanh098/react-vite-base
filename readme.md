# React Query

## React Query là gì?

TanStack Query bao gồm React Query là thư viện giúp quản lý các state bất đồng bộ như data từ api. (server state)

Ưu điểm của Tanstack Query

- Quản lý cache data và cập nhật cực kỳ đơn giản.
- Setup đơn giản , zero config
- Không dùng global state, reducer để quản lý, không học thuật khó hiểu.

Tanstack Query không đảm nhận việc gọi API, việc gọi API sẽ thực hiện thông qua các thư viện bạn dùng như axios, fetch API. Còn Tanstack Query chỉ đảm nhận việc quản lý data và trigger khi cần thiết.
