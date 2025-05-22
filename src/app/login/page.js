export default function LoginPage() {
    return (
        <div className="content-area">
            <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Alamat Email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}
