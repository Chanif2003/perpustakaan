<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{$title}</title>

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
            {{-- <td><strong>To:</strong> Linblum - Barrio Comercial</td> --}}
        </tr>
        <tr>
            <td><strong>Laporan :</strong> Laporan Anggota Pustaka</td>
        </tr>
    </table>

    <br />

    <table width="100%">
        <thead style="background-color: lightgray;">
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Jenis Klamin</th>
                <th>Tempat Tanggal Lahir</th>
                <th>No Telepon</th>
                <th>Alamat</th>
            </tr>
        </thead>
        <tbody>
            @php
                $i = 1;
            @endphp
            @foreach ($data as $item)
                <tr>
                    <td>{{ $i++ }}</td>
                    <td>{{ $item->nama }}</td>
                    <td>{{ $item->jenis_klamin }}</td>
                    <td>{{ $item->tempat_lahir . ' ' . $item->tanggal_lahir }}</td>
                    <td>{{ $item->tlp }}</td>
                    <td>{{ $item->alamat }}</td>

                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>
