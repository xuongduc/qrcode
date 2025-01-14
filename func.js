


const form = document.getElementById('qrForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const link = document.getElementById('link').value;
            const filename = document.getElementById('filename').value || 'qr_code.png';
            const code = document.getElementById('qrcode');
            

            try{
                const response = await fetch('https://xuongduc.github.io/qrcode/generate_qr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ link, filename }),
                });

                const data = await response.json();
                if (response.ok) {
                    document.getElementById('result').innerHTML = `
                        <p>${data.message}</p>
                        <p>File saved as: ${data.filename}</p>
                        <img src = ${data.filename} alt="lỗi file, liên hệ xudu">
                        
                        
                    `;
                    const test = document.createElement('a');
                    test.href = link;
                    test.download = filename;
                    document.body.appendChild(test);
                    test.click();
                    document.body.removeChild(test);
                    const del = await fetch(`http://127.0.0.1:5000/delete_file`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ filename }),
                    });
                } else {
                    document.getElementById('result').innerHTML = `<p>Error: ${data.error}</p>`;
                }
            } catch(error){
                document.getElementById('result').innerHTML = `<p>Error: ${data.error}</p>`;
            }
        });