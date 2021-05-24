<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ $title }}</title>

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
        <tr>
            <td><strong>Laporan :</strong> Laporan Pengembalian Buku</td>
        </tr>

        </tr>

    </table>

    <br />

    <table width="100%">
        <table width="100%">
            <thead style="background-color: lightgray;">
                <tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                    <th>Alamat</th>
                    <th>No Hendphone</th>
                    <th>Tanggal Pinjam</th>
                    <th>Lama Pinjam</th>
                    <th>Tanggal Pengembalian</th>
                    <th>Jumlah Buku</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $i = 1;
                @endphp
                @foreach ($data as $item)
                    <tr>
                        <td>{{ $i++ }}</td>
                        <td>{{ $item['pinjaman']->nama }}</td>
                        <td>{{ $item['pinjaman']->alamat }}</td>
                        <td>{{ $item['pinjaman']->tlp }}</td>
                        <td>
                            {{ $item['pinjaman']->tanggal_pinjam }}
                        </td>
                        <td>
                            {{ $item['pinjaman']->lama_pinjam . ' Hari' }}
                        </td>
                        <td>
                            {{ $item['pinjaman']->tanggal_kembali }}

                        </td>
                        <td>{{ $item['jumlahPinjam'] . ' Buku' }}</td>
                    </tr>
                @endforeach


            </tbody>
        </table>

</body>

</html>
