import { spawn } from "child_process";
import path from "path";

export async function POST(req) {
  try {
    const { args = [] } = await req.json(); 
    const scriptPath = path.join(process.cwd(), "", "ucsfresearch.py");

    return new Promise((resolve) => {
      const py = spawn("python3", [scriptPath, ...args]);

      let output = "";
      let errorOutput = "";

      py.stdout.on("data", (data) => {
        output += data.toString();
      });

      py.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      py.on("close", (code) => {
        if (code !== 0) {
          console.error("Python error:", errorOutput);
          resolve(
            new Response(
              JSON.stringify({ success: false, error: errorOutput }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            )
          );
        } else {
          try {
            const jsonOutput = JSON.parse(output);
            resolve(
              new Response(JSON.stringify(jsonOutput), {
                status: 200,
                headers: { "Content-Type": "application/json" },
              })
            );
          } catch {
            resolve(
              new Response(
                JSON.stringify({ success: true, output }),
                { status: 200, headers: { "Content-Type": "application/json" } }
              )
            );
          }
        }
      });
    });
  } catch (err) {
    console.error("Error running Python script:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
