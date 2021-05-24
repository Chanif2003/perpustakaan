<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{$title}}</title>

    <style type="text/css">
        * {
            font-family: Verdana, Arial, sans-serif;
        }

        table {
            font-size: x-small;
        }

        tfoot tr td {
            font-weight: bold;
            font-size: x-small;
        }

        .gray {
            background-color: lightgray
        }

    </style>

</head>

<body>

    <table width="100%">
        <tr>
            <td valign="top">
                {{-- <img src="{{ asset('images/meteor-logo.png') }}" alt="" width="150" /> --}}
            </td>
            <td align="center" style="margin-bottom: 20px">
                <h3>{{ $kop['kepalaSurat'] }}</h3>
                <p>{{ $kop['SubTitle'] }}</p>
                <hr />
                {{-- ////////////////////////////////////// --}}
                <br />
                <br />
            </td>
        </tr>

    </table>

    <table width="100%">
        <tr>
            <td><strong>Tanggal: </strong>{{ date('d-m-Y') }} </td>

        </tr>
        <tr>
            <td><strong>Laporan :</strong> Laporan Buku</td>
        </tr>
    </table>

    <br />

    <table width="100%">
        <table width="100%">
            <thead style="background-color: lightgray;">
                <tr>
                    <th>No</th>
                    <th>kode Buku</th>
                    <th>Judul Buku</th>
                    <th>Kategori</th>
                    <th>Penerbit</th>
                    <th>Pengarang</th>
                    <th>Jumlah Halaman</th>
                    <th>Stok</th>
                    <th>Tahin Terbit</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $i = 1;
                @endphp
                @foreach ($data as $item)
                    <tr>
                        <td>{{ $i++ }}</td>
                        <td>{{ $item->kode_buku }}</td>
                        <td>{{ $item->judul_buku }}</td>
                        <td>{{ $item->Kategori }}</td>
                        <td>{{ $item->penerbit }}</td>
                        <td>{{ $item->pengarang }}</td>
                        <td>{{ $item->jumlah_halaman }}</td>
                        <td>{{ $item->stok }}</td>
                        <td>{{ $item->tahun_terbit }}</td>

                    </tr>
                @endforeach


            </tbody>
        </table>

</body>

</html>
