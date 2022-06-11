import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { getDataFromSheets } from "./api/sheets";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home({ data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {},
  });

  const sentKehadiran = async (data) => {
    fetch("/api/sentData", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // reset(); // clears the input on submitting
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextsheet 💩</title>
        <meta
          name="description"
          content="Connecting NextJS with Google Spreadsheets as Database"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="my-6">
          <h1>Redirecting to Nextsheet</h1>
          <p>Connecting NextJS with Google Spreadsheets as Database</p>
          <p>Example fetched from Google Spreadsheet:</p>
        </div>

        <div className="px-4 py-8 sm:px-8">
          <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                {/* <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                  No.
                </th> */}
                <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                  Nama
                </th>
                <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                  Instansi
                </th>
                <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                  Kehadiran
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.length ? (
                data.map((item) => (
                  <tr key={item}>
                    {/* <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {item.id}
                    </td> */}
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {item.name}
                    </td>
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {item.institution}
                    </td>
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {item.attendance}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>Error: do not forget to setup your env variables 👇</tr>
              )}
            </tbody>
          </table>
        </div>

        <div>
          <h2>Setting up environment variables</h2>
          <code>GOOGLE_SHEETS_PRIVATE_KEY=[YOUR KEY]</code>
          <br />

          <code>GOOGLE_SHEETS_CLIENT_EMAIL=[YOUR ACCOUNT EMAIL]</code>
          <br />
          <code>SPREADSHEET_ID=[YOU CAN GET THIS ON URL OF YOUR SHEETS]</code>
          <br />
          <code>SPREADSHEET_NAME=[SHEET NAME]</code>
          <p>
            <a href="https://github.com/lucasromerodb/nextsheet">
              GitHub repo »
            </a>
            <br />
          </p>
        </div>

        <div className="flex flex-col text-center max-w-5xl mx-auto my-8">
          <div className="sm:col-span-1 py-2">
            <dt className="text-sm font-medium text-gray-500">
              Konfirmasi Kehadiran
            </dt>

            <form onSubmit={handleSubmit(sentKehadiran)}>
              <textarea
                id="namaHadir"
                name="namaHadir"
                {...register("namaHadir", {
                  required: "This is required!",
                  minLength: {
                    value: 10,
                    message:
                      "Please lengthen this text to 10 characters or more.",
                  },
                })}
                rows={3}
                style={{
                  resize: "none",
                }}
                className={classNames(
                  errors.namaHadir
                    ? "border-red-300 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                    : "focus:ring-blue-500 focus:border-blue-500",
                  "shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                )}
                placeholder="Nama Hadir"
              />
              <textarea
                id="instansi"
                name="instansi"
                {...register("instansi", {
                  required: "This is required!",
                  minLength: {
                    value: 10,
                    message:
                      "Please lengthen this text to 10 characters or more.",
                  },
                })}
                rows={3}
                style={{
                  resize: "none",
                }}
                className={classNames(
                  errors.instansi
                    ? "border-red-300 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                    : "focus:ring-blue-500 focus:border-blue-500",
                  "shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                )}
                placeholder="Instansi"
              />
              <textarea
                id="ucapan"
                name="ucapan"
                {...register("ucapan", {
                  required: "This is required!",
                  minLength: {
                    value: 10,
                    message:
                      "Please lengthen this text to 10 characters or more.",
                  },
                })}
                rows={3}
                style={{
                  resize: "none",
                }}
                className={classNames(
                  errors.ucapan
                    ? "border-red-300 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                    : "focus:ring-blue-500 focus:border-blue-500",
                  "shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                )}
                placeholder="Ucapan"
              />

              {/* <div>
                <h2>will you attend?</h2>
                <Plans />
                <h2>how will you attend</h2>
              </div> */}

              <button
                type="submit"
                className="ml-1 pl-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const sheet = await getDataFromSheets();
  return {
    props: {
      data: sheet.slice(1, sheet.length), // remove sheet header
    },
    revalidate: 1, // In seconds
  };
}
